import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Collapse } from 'react-bootstrap';
import { StatsFilters, FilterOptionsData } from '../../types/stats';

interface StatsFiltersPanelProps {
  filters: StatsFilters;
  onApplyFilters: (filters: StatsFilters) => void;
  onClearFilters: () => void;
  filterOptions: FilterOptionsData | null;
  loading: boolean;
}

const StatsFiltersPanel: React.FC<StatsFiltersPanelProps> = ({
  filters,
  onApplyFilters,
  onClearFilters,
  filterOptions,
  loading,
}) => {
  const [localFilters, setLocalFilters] = useState<StatsFilters>(filters);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (field: keyof StatsFilters, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== undefined && val !== null && val !== ''
  );

  return (
    <Card
      style={{
        border: 'none',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px',
      }}
    >
      <Card.Body style={{ padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isOpen ? '20px' : '0',
          }}
        >
          <div>
            <h5
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2a4040',
                margin: 0,
              }}
            >
              Filtros {hasActiveFilters && `(${Object.keys(filters).length} activos)`}
            </h5>
          </div>
          <Button
            variant="link"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              textDecoration: 'none',
              color: '#5a8a8a',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {isOpen ? '▲ Ocultar' : '▼ Mostrar'}
          </Button>
        </div>

        <Collapse in={isOpen}>
          <div>
            <Form>
              <Row className="g-3">
                {/* Country */}
                <Col md={6} lg={4}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      País
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={localFilters.country || ''}
                      onChange={(e) => handleChange('country', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Todos</option>
                      {filterOptions?.countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Market */}
                <Col md={6} lg={4}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Mercado
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={localFilters.market || ''}
                      onChange={(e) => handleChange('market', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Todos</option>
                      {filterOptions?.markets.slice(0, 50).map((market) => (
                        <option key={market} value={market}>
                          {market}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Property Type */}
                <Col md={6} lg={4}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Tipo de Propiedad
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={localFilters.property_type || ''}
                      onChange={(e) => handleChange('property_type', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Todos</option>
                      {filterOptions?.property_types.slice(0, 20).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Price Min */}
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Precio Mínimo
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder="0"
                      value={localFilters.price_min || ''}
                      onChange={(e) => handleChange('price_min', e.target.value ? Number(e.target.value) : undefined)}
                      disabled={loading}
                    />
                  </Form.Group>
                </Col>

                {/* Price Max */}
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Precio Máximo
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder="1000"
                      value={localFilters.price_max || ''}
                      onChange={(e) => handleChange('price_max', e.target.value ? Number(e.target.value) : undefined)}
                      disabled={loading}
                    />
                  </Form.Group>
                </Col>

                {/* Accommodates Min */}
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Capacidad Mín.
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder="1"
                      value={localFilters.accommodates_min || ''}
                      onChange={(e) => handleChange('accommodates_min', e.target.value ? Number(e.target.value) : undefined)}
                      disabled={loading}
                    />
                  </Form.Group>
                </Col>

                {/* Accommodates Max */}
                <Col md={6} lg={3}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Capacidad Máx.
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder="16"
                      value={localFilters.accommodates_max || ''}
                      onChange={(e) => handleChange('accommodates_max', e.target.value ? Number(e.target.value) : undefined)}
                      disabled={loading}
                    />
                  </Form.Group>
                </Col>

                {/* Review Score Min */}
                <Col md={6} lg={4}>
                  <Form.Group>
                    <Form.Label style={{ fontSize: '13px', fontWeight: '500', color: '#495057' }}>
                      Puntuación Mínima
                    </Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      placeholder="0"
                      min="0"
                      max="100"
                      value={localFilters.review_score_min || ''}
                      onChange={(e) => handleChange('review_score_min', e.target.value ? Number(e.target.value) : undefined)}
                      disabled={loading}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '20px',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleClear}
                  disabled={loading || !hasActiveFilters}
                  style={{
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  Limpiar
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApply}
                  disabled={loading}
                  style={{
                    backgroundColor: '#5a8a8a',
                    borderColor: '#5a8a8a',
                    borderRadius: '8px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: '500',
                  }}
                >
                  Aplicar Filtros
                </Button>
              </div>
            </Form>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default StatsFiltersPanel;
