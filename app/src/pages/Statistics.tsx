import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert, Badge } from 'react-bootstrap';
import Header from '../components/Header';
import KPICards from '../components/stats/KPICards';
import PriceDistributionChart from '../components/stats/PriceDistributionChart';
import PropertyTypesChart from '../components/stats/PropertyTypesChart';
import AccommodatesChart from '../components/stats/AccommodatesChart';
import AvailabilityChart from '../components/stats/AvailabilityChart';
import ReviewScoresChart from '../components/stats/ReviewScoresChart';
import StatsFiltersPanel from '../components/stats/StatsFiltersPanel';
import {
  getOverview,
  getPriceDistribution,
  getPropertyTypes,
  getAccommodates,
  getAvailability,
  getReviewScores,
  getFilterOptions,
} from '../services/statsService';
import {
  StatsFilters,
  OverviewData,
  PriceDistributionData,
  PropertyTypesData,
  AccommodatesData,
  AvailabilityData,
  ReviewScoresData,
  FilterOptionsData,
} from '../types/stats';
import '../utils/chartConfig';

const Statistics: React.FC = () => {
  const [filters, setFilters] = useState<StatsFilters>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Data states
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [priceDistribution, setPriceDistribution] = useState<PriceDistributionData | null>(null);
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypesData | null>(null);
  const [accommodates, setAccommodates] = useState<AccommodatesData | null>(null);
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [reviewScores, setReviewScores] = useState<ReviewScoresData | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsData | null>(null);

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err: any) {
        console.error('Error loading filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Load all statistics
  const loadStatistics = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const [
        overviewData,
        priceData,
        typesData,
        accommodatesData,
        availabilityData,
        scoresData,
      ] = await Promise.all([
        getOverview(filters),
        getPriceDistribution(filters),
        getPropertyTypes(filters),
        getAccommodates(filters),
        getAvailability(filters),
        getReviewScores(filters),
      ]);

      setOverview(overviewData);
      setPriceDistribution(priceData);
      setPropertyTypes(typesData);
      setAccommodates(accommodatesData);
      setAvailability(availabilityData);
      setReviewScores(scoresData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las estadísticas');
      console.error('Error loading statistics:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load statistics when filters change
  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  const handleApplyFilters = (newFilters: StatsFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.values(filters).filter(
    (val) => val !== undefined && val !== null && val !== ''
  ).length;

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '40px',
        }}
      >
        <Container fluid style={{ maxWidth: '1400px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <h1
                  style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#2a4040',
                    margin: 0,
                    marginBottom: '8px',
                  }}
                >
                  📊 Estadísticas
                </h1>
                <p
                  style={{
                    fontSize: '16px',
                    color: '#6c757d',
                    margin: 0,
                  }}
                >
                  Resumen analítico de propiedades disponibles
                </p>
              </div>
              {activeFiltersCount > 0 && (
                <Badge
                  bg="success"
                  style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#5a8a8a',
                  }}
                >
                  {activeFiltersCount} {activeFiltersCount === 1 ? 'filtro activo' : 'filtros activos'}
                </Badge>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          <StatsFiltersPanel
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            filterOptions={filterOptions}
            loading={loading}
          />

          {/* Error State */}
          {error && (
            <Alert variant="danger" className="mb-4">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
              <p className="mb-0">
                <small>Asegúrate de que el backend esté ejecutándose en http://localhost:3000</small>
              </p>
            </Alert>
          )}

          {/* KPI Cards */}
          <KPICards data={overview} loading={loading} />

          {/* Charts Grid */}
          <Row className="g-4">
            {/* Price Distribution */}
            <Col xs={12} lg={6}>
              <PriceDistributionChart data={priceDistribution} loading={loading} />
            </Col>

            {/* Property Types */}
            <Col xs={12} lg={6}>
              <PropertyTypesChart data={propertyTypes} loading={loading} />
            </Col>

            {/* Accommodates */}
            <Col xs={12} lg={6}>
              <AccommodatesChart data={accommodates} loading={loading} />
            </Col>

            {/* Availability */}
            <Col xs={12} lg={6}>
              <AvailabilityChart data={availability} loading={loading} />
            </Col>

            {/* Review Scores */}
            <Col xs={12}>
              <ReviewScoresChart data={reviewScores} loading={loading} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Statistics;
