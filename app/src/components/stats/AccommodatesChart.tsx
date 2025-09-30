import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { AccommodatesData } from '../../types/stats';
import { defaultChartOptions, greenColors } from '../../utils/chartConfig';

interface AccommodatesChartProps {
  data: AccommodatesData | null;
  loading: boolean;
}

const AccommodatesChart: React.FC<AccommodatesChartProps> = ({ data, loading }) => {
  const chartData = {
    labels: data?.points.map((p) => `${p.accommodates} personas`) || [],
    datasets: [
      {
        label: 'Número de Propiedades',
        data: data?.points.map((p) => p.count) || [],
        borderColor: greenColors.primary,
        backgroundColor: `${greenColors.primary}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: greenColors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      tooltip: {
        ...defaultChartOptions.plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            return `Propiedades: ${context.parsed.y.toLocaleString('es-ES')}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#6c757d',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          color: '#6c757d',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card
      style={{
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        height: '100%',
      }}
    >
      <Card.Body style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h5
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#2a4040',
              margin: 0,
            }}
          >
            Capacidad de Huéspedes
          </h5>
          <p
            style={{
              fontSize: '13px',
              color: '#6c757d',
              margin: '4px 0 0 0',
            }}
          >
            Distribución por número de personas
          </p>
        </div>

        {loading ? (
          <div
            style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : data && data.points.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <div
            style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              color: '#6c757d',
            }}
          >
            Sin datos disponibles
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AccommodatesChart;
