import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

export const connectDB = async (): Promise<void> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }

      await mongoose.connect(mongoUri);
      
      console.log('✅ MongoDB connected successfully');
      console.log(`📊 Database: ${mongoose.connection.name}`);
      
      // Set up connection event listeners
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected');
      });

      return;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries}/${MAX_RETRIES} failed:`, error);
      
      if (retries < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        console.error('💥 Max retries reached. Could not connect to MongoDB');
        throw error;
      }
    }
  }
};

export const getDBStatus = (): { connected: boolean; state: string } => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return {
    connected: mongoose.connection.readyState === 1,
    state: states[mongoose.connection.readyState] || 'unknown'
  };
};
