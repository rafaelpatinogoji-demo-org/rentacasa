import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { PriceDistributionData } from '../../types/stats';
import { defaultChartOptions, greenColors } from '../../utils/chartConfig';

interface PriceDistributionChartProps {
  data: PriceDistributionData | null;
  loading: boolean;
}

const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({ data, loading }) => {
  const chartData = {
    labels: data?.buckets.map((b) => b.range) || [],
    datasets: [
      {
        label: 'Número de Propiedades',
        data: data?.buckets.map((b) => b.count) || [],
        backgroundColor: greenColors.primary,
        borderColor: greenColors.dark,
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: greenColors.secondary,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      title: {
        display: false,
      },
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
          maxRotation: 45,
          minRotation: 45,
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
            Distribución de Precios
          </h5>
          <p
            style={{
              fontSize: '13px',
              color: '#6c757d',
              margin: '4px 0 0 0',
            }}
          >
            Cantidad de propiedades por rango de precio
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
        ) : data && data.buckets.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Bar data={chartData} options={options} />
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

export default PriceDistributionChart;
