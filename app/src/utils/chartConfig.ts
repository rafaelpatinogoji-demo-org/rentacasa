import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Green color palette
export const greenColors = {
  primary: '#5a8a8a',
  secondary: '#6fa3a3',
  tertiary: '#84bcbc',
  light: '#99d5d5',
  lighter: '#aeeaea',
  dark: '#3d5a5a',
  darker: '#2a4040',
};

// Chart default options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        padding: 15,
        font: {
          size: 12,
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
        color: '#495057',
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 12,
      },
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      displayColors: true,
      boxPadding: 6,
    },
  },
  animation: {
    duration: 750,
    easing: 'easeInOutQuart' as const,
  },
};

// Generate gradient for charts
export const createGradient = (ctx: CanvasRenderingContext2D, color: string, alpha: number = 0.2) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`);
  return gradient;
};
