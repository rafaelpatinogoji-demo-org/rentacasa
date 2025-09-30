import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/database';
import listingRoutes from './routes/listingRoutes';
import statsRoutes from './routes/statsRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Configure CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN 
    : 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 200, // Limit each IP to 200 requests per minute
  message: {
    statusCode: 429,
    message: 'Too many requests from this IP, please try again later',
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Rate limit exceeded' }
  }
});

app.use('/api/', limiter);

// Parse JSON bodies
app.use(express.json());

// Request logging middleware (simple version)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  res.status(dbStatus.connected ? 200 : 503).json({
    statusCode: dbStatus.connected ? 200 : 503,
    message: dbStatus.connected ? 'API is running' : 'Database not connected',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatus
    }
  });
});

// Hello endpoint (legacy from step 1)
app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    message: 'Hola Windsurf'
  });
});

// API Routes
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/stats', statsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Endpoint not found',
    error: { code: 'NOT_FOUND', message: `Cannot ${req.method} ${req.path}` }
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || 'Internal server error',
    error: {
      code: err.code || 'SERVER_ERROR',
      message: err.message || 'An unexpected error occurred'
    }
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`🚀 API running on http://localhost:${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`📚 Listings API: http://localhost:${PORT}/api/v1/listings`);
      console.log(`🔍 Search API: http://localhost:${PORT}/api/v1/listings/search`);
      console.log(`📊 Stats API: http://localhost:${PORT}/api/v1/stats`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('⚠️  SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start the application
startServer();
