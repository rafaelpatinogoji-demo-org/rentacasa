import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

interface FilterSidebarProps {
  onApplyFilters: (filters: {
    property_type: string;
    market: string;
    bedrooms: string;
    min_price: string;
    max_price: string;
  }) => void;
  onClearFilters: () => void;
  currentFilters: {
    property_type: string;
    market: string;
    bedrooms: string;
    min_price: string;
    max_price: string;
  };
  hasActiveFilters: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  onApplyFilters, 
  onClearFilters, 
  currentFilters,
  hasActiveFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);

  // Sync local filters with current filters from parent
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleInputChange = (field: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleClear = () => {
    setLocalFilters({
      property_type: '',
      market: '',
      bedrooms: '',
      min_price: '',
      max_price: ''
    });
    onClearFilters();
  };

  return (
    <div
      className="filter-sidebar-mobile"
      style={{
        position: 'sticky',
        top: '140px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        padding: '28px',
      }}
    >
      {/* City/Market Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: '#212529', marginBottom: '8px' }}>
          ¿Dónde?
        </Form.Label>
        <Form.Select
          aria-label="Seleccionar ciudad"
          value={localFilters.market}
          onChange={(e) => handleInputChange('market', e.target.value)}
          style={{
            backgroundColor: '#f8f8f8',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
          }}
        >
          <option value="">Todas las ciudades</option>
          <option value="Istanbul">Istanbul</option>
          <option value="Montreal">Montreal</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Sydney">Sydney</option>
          <option value="New York">New York</option>
          <option value="Rio De Janeiro">Rio De Janeiro</option>
          <option value="Porto">Porto</option>
          <option value="Oahu">Oahu</option>
          <option value="Maui">Maui</option>
        </Form.Select>
      </Form.Group>

      {/* Property Type Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: '#212529', marginBottom: '8px' }}>
          Tipo
        </Form.Label>
        <Form.Select
          aria-label="Seleccionar tipo de propiedad"
          value={localFilters.property_type}
          onChange={(e) => handleInputChange('property_type', e.target.value)}
          style={{
            backgroundColor: '#f8f8f8',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
          }}
        >
          <option value="">Todos los tipos</option>
          <option value="Apartment">Apartamento</option>
          <option value="House">Casa</option>
          <option value="Condominium">Condominio</option>
          <option value="Serviced apartment">Apartamento con servicio</option>
          <option value="Loft">Loft</option>
          <option value="Townhouse">Casa adosada</option>
          <option value="Guest suite">Suite de huéspedes</option>
          <option value="Bed and breakfast">B&B</option>
          <option value="Boutique hotel">Hotel boutique</option>
          <option value="Guesthouse">Hospedaje</option>
        </Form.Select>
      </Form.Group>

      {/* Bedrooms Filter */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: '#212529', marginBottom: '8px' }}>
          Habitaciones
        </Form.Label>
        <Form.Select
          aria-label="Seleccionar habitaciones"
          value={localFilters.bedrooms}
          onChange={(e) => handleInputChange('bedrooms', e.target.value)}
          style={{
            backgroundColor: '#f8f8f8',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
          }}
        >
          <option value="">Cualquier cantidad</option>
          <option value="1">1 habitación</option>
          <option value="2">2 habitaciones</option>
          <option value="3">3 habitaciones</option>
          <option value="4">4 habitaciones</option>
          <option value="5">5+ habitaciones</option>
        </Form.Select>
      </Form.Group>

      {/* Price Range Filter */}
      <Form.Group className="mb-4">
        <Form.Label style={{ fontWeight: '600', fontSize: '14px', color: '#212529', marginBottom: '8px' }}>
          Rango de Precio (por noche)
        </Form.Label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Form.Control
            type="number"
            placeholder="Min"
            value={localFilters.min_price}
            onChange={(e) => handleInputChange('min_price', e.target.value)}
            style={{
              backgroundColor: '#f8f8f8',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '14px',
            }}
          />
          <span style={{ color: '#6c757d' }}>-</span>
          <Form.Control
            type="number"
            placeholder="Max"
            value={localFilters.max_price}
            onChange={(e) => handleInputChange('max_price', e.target.value)}
            style={{
              backgroundColor: '#f8f8f8',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 12px',
              fontSize: '14px',
            }}
          />
        </div>
      </Form.Group>

      {/* Apply Button */}
      <div className="d-grid mb-2">
        <Button
          onClick={handleApply}
          style={{
            backgroundColor: '#5a8a8a',
            border: 'none',
            borderRadius: '99em',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4a7a7a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#5a8a8a';
          }}
        >
          🔍 BUSCAR
        </Button>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="d-grid mb-2">
          <Button
            onClick={handleClear}
            variant="outline-secondary"
            style={{
              borderRadius: '99em',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              borderColor: '#dee2e6',
              color: '#6c757d',
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {hasActiveFilters && (
        <div className="text-center mt-2">
          <small style={{ fontSize: '12px', color: '#5a8a8a', fontWeight: '500' }}>
            ✓ Filtros activos
          </small>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
