import React from 'react';
import { Card } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import { AvailabilityData } from '../../types/stats';
import { defaultChartOptions, greenColors } from '../../utils/chartConfig';

interface AvailabilityChartProps {
  data: AvailabilityData | null;
  loading: boolean;
}

const AvailabilityChart: React.FC<AvailabilityChartProps> = ({ data, loading }) => {
  const chartData = {
    labels: ['30 días', '60 días', '90 días', '365 días'],
    datasets: [
      {
        label: 'Disponibilidad Promedio (días)',
        data: data ? [data.d30, data.d60, data.d90, data.d365] : [],
        backgroundColor: `${greenColors.primary}30`,
        borderColor: greenColors.primary,
        borderWidth: 2,
        pointBackgroundColor: greenColors.primary,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
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
            return `Disponibilidad: ${context.parsed.r.toFixed(1)} días`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          color: '#6c757d',
          font: {
            size: 10,
          },
          backdropColor: 'transparent',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: '#495057',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
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
            Disponibilidad
          </h5>
          <p
            style={{
              fontSize: '13px',
              color: '#6c757d',
              margin: '4px 0 0 0',
            }}
          >
            Promedio de días disponibles
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
        ) : data ? (
          <div style={{ height: '300px' }}>
            <Radar data={chartData} options={options} />
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

export default AvailabilityChart;
