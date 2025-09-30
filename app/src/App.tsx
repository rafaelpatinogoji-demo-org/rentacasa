import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './App.css';
import { Listing, Pagination } from './types/listing';
import { getAllListings, searchListings } from './services/listingService';
import ListingCard from './components/ListingCard';
import FilterSidebar from './components/FilterSidebar';
import CustomPagination from './components/CustomPagination';
import Header from './components/Header';

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<{
    property_type: string;
    market: string;
    bedrooms: string;
    min_price: string;
    max_price: string;
  }>({
    property_type: '',
    market: '',
    bedrooms: '',
    min_price: '',
    max_price: ''
  });
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 12;

  // Check if filters are active
  const checkActiveFilters = () => {
    const active = filters.property_type !== '' || 
                   filters.market !== '' || 
                   filters.bedrooms !== '' || 
                   filters.min_price !== '' || 
                   filters.max_price !== '';
    setHasActiveFilters(active);
  };

  // Load listings with filters
  const loadListings = async (page: number) => {
    setLoading(true);
    setError('');

    try {
      let data;
      
      if (hasActiveFilters) {
        // Use search endpoint with filters
        const searchFilters: any = {};
        if (filters.property_type) searchFilters.property_type = filters.property_type;
        if (filters.market) searchFilters.market = filters.market;
        if (filters.bedrooms) searchFilters.bedrooms = parseInt(filters.bedrooms);
        if (filters.min_price) searchFilters.min_price = parseFloat(filters.min_price);
        if (filters.max_price) searchFilters.max_price = parseFloat(filters.max_price);
        
        data = await searchListings(searchFilters, page, ITEMS_PER_PAGE);
      } else {
        // Use regular endpoint
        data = await getAllListings(page, ITEMS_PER_PAGE);
      }
      
      setListings(data.listings);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los listings');
      console.error('Error loading listings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check active filters when filters change
  useEffect(() => {
    checkActiveFilters();
  }, [filters]);

  // Load initial data
  useEffect(() => {
    loadListings(currentPage);
  }, [currentPage, hasActiveFilters]);

  // Handle apply filters
  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      property_type: '',
      market: '',
      bedrooms: '',
      min_price: '',
      max_price: ''
    });
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle next page
  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (pagination?.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '120px', paddingBottom: '2rem' }}>
        <Container fluid>

        <Row>
          {/* Left Column - Filters */}
          <Col md={3} className="mb-4">
            <FilterSidebar 
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              currentFilters={filters}
              hasActiveFilters={hasActiveFilters}
            />
          </Col>

          {/* Right Column - Listings */}
          <Col md={9}>
            {/* Section Title */}
            <div className="mb-3">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontWeight: '600', color: '#3d5a5a', fontSize: '32px', marginBottom: '8px' }}>
                    Propiedades Disponibles
                  </h2>
                  {pagination && (
                    <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
                      {pagination.totalItems} {pagination.totalItems === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                      {hasActiveFilters && ' (filtrado)'}
                    </p>
                  )}
                </div>
                {hasActiveFilters && !loading && (
                  <button
                    onClick={handleClearFilters}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '13px',
                      color: '#6c757d',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.borderColor = '#adb5bd';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#dee2e6';
                    }}
                  >
                    ✕ Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
                <p className="mt-3 text-muted">Cargando propiedades...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <Alert variant="danger" className="text-center">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
                <p className="mb-0">
                  <small>Asegúrate de que el backend esté ejecutándose en http://localhost:3000</small>
                </p>
              </Alert>
            )}

            {/* Listings Grid */}
            {!loading && !error && listings.length > 0 && (
              <>
                <Row style={{ gap: '24px 0' }}>
                  {listings.map((listing) => (
                    <Col key={listing._id} xs={12} md={6} className="mb-4">
                      <ListingCard listing={listing} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <CustomPagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                    onNext={handleNextPage}
                    onPrevious={handlePreviousPage}
                  />
                )}
              </>
            )}

            {/* Empty State */}
            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-5">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
                <h5 style={{ color: '#6c757d', fontWeight: '600' }}>
                  {hasActiveFilters ? 'No se encontraron propiedades' : 'No hay propiedades disponibles'}
                </h5>
                <p className="text-muted" style={{ marginBottom: '20px' }}>
                  {hasActiveFilters 
                    ? 'Intenta ajustar o limpiar tus filtros para ver más resultados' 
                    : 'No hay propiedades en este momento'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    style={{
                      backgroundColor: '#5a8a8a',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#4a7a7a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#5a8a8a';
                    }}
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
}

export default App;
