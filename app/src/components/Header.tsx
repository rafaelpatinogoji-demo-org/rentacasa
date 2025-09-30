import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isStatistics = location.pathname === '/statistics';

  return (
    <header
      className="header-mobile"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        background: 'rgba(61, 90, 90, 0.7)',
        backdropFilter: 'blur(10px) saturate(180%)',
        WebkitBackdropFilter: 'blur(10px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        paddingTop: '16px',
        paddingBottom: '16px',
      }}
    >
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '28px' }}>🏡</span>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  lineHeight: 1.2,
                }}
              >
                RentaCasa
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1,
                }}
              >
                Construido con Windsurf
              </p>
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: isStatistics ? 'rgba(255, 255, 255, 0.7)' : '#ffffff',
                fontSize: '15px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isStatistics ? 'transparent' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              🏠 Propiedades
            </Link>
            <Link
              to="/statistics"
              style={{
                textDecoration: 'none',
                color: isStatistics ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                fontSize: '15px',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isStatistics ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              }}
            >
              📊 Estadísticas
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
