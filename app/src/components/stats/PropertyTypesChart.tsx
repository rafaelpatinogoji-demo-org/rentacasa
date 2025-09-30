import React from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { PropertyTypesData } from '../../types/stats';
import { defaultChartOptions, greenColors } from '../../utils/chartConfig';

interface PropertyTypesChartProps {
  data: PropertyTypesData | null;
  loading: boolean;
}

const PropertyTypesChart: React.FC<PropertyTypesChartProps> = ({ data, loading }) => {
  // Take top 6 and group the rest as "Otros"
  const items = data?.items || [];
  const topItems = items.slice(0, 6);
  const otherItems = items.slice(6);
  const otherCount = otherItems.reduce((sum, item) => sum + item.count, 0);
  const otherPercentage = otherItems.reduce((sum, item) => sum + item.percentage, 0);

  const displayItems = [...topItems];
  if (otherCount > 0) {
    displayItems.push({
      type: 'Otros',
      count: otherCount,
      percentage: otherPercentage,
    });
  }

  const colors = [
    greenColors.primary,
    greenColors.secondary,
    greenColors.tertiary,
    greenColors.light,
    greenColors.lighter,
    '#b8f0f0',
    '#d0f5f5',
  ];

  const chartData = {
    labels: displayItems.map((item) => item.type),
    datasets: [
      {
        data: displayItems.map((item) => item.count),
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins.legend,
        position: 'right' as const,
      },
      tooltip: {
        ...defaultChartOptions.plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const item = displayItems[context.dataIndex];
            return [
              `${item.type}`,
              `Propiedades: ${item.count.toLocaleString('es-ES')}`,
              `Porcentaje: ${item.percentage.toFixed(1)}%`,
            ];
          },
        },
      },
    },
    cutout: '65%',
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
            Tipos de Propiedad
          </h5>
          <p
            style={{
              fontSize: '13px',
              color: '#6c757d',
              margin: '4px 0 0 0',
            }}
          >
            Distribución por categoría
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
        ) : data && data.items.length > 0 ? (
          <div style={{ height: '300px' }}>
            <Doughnut data={chartData} options={options} />
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

export default PropertyTypesChart;
