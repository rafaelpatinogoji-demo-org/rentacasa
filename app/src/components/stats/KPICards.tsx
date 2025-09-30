import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { OverviewData } from '../../types/stats';

interface KPICardsProps {
  data: OverviewData | null;
  loading: boolean;
}

const KPICards: React.FC<KPICardsProps> = ({ data, loading }) => {
  const kpis = [
    {
      title: 'Total Propiedades',
      value: data?.totalProperties || 0,
      icon: '🏠',
      format: (val: number) => val.toLocaleString('es-ES'),
      color: '#5a8a8a',
    },
    {
      title: 'Precio Promedio',
      value: data?.avgPrice || 0,
      icon: '💰',
      format: (val: number) => `$${val.toFixed(2)}`,
      color: '#6fa3a3',
    },
    {
      title: 'Precio Mediano',
      value: data?.medianPrice || 0,
      icon: '📊',
      format: (val: number) => `$${val.toFixed(2)}`,
      color: '#84bcbc',
    },
    {
      title: 'Reviews Promedio',
      value: data?.avgReviews || 0,
      icon: '⭐',
      format: (val: number) => val.toFixed(1),
      color: '#99d5d5',
    },
  ];

  return (
    <Row className="g-3 mb-4">
      {kpis.map((kpi, index) => (
        <Col key={index} xs={12} sm={6} lg={3}>
          <Card
            style={{
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              height: '100%',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }}
          >
            <Card.Body style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '13px',
                      color: '#6c757d',
                      fontWeight: '500',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {kpi.title}
                  </div>
                  {loading ? (
                    <div
                      style={{
                        height: '32px',
                        width: '80%',
                        backgroundColor: '#e9ecef',
                        borderRadius: '4px',
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: kpi.color,
                        lineHeight: 1.2,
                      }}
                    >
                      {kpi.format(kpi.value)}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    opacity: 0.8,
                    marginLeft: '12px',
                  }}
                >
                  {kpi.icon}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KPICards;
