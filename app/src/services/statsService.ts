import axios, { AxiosError } from 'axios';
import {
  StatsFilters,
  StatsResponse,
  OverviewData,
  PriceDistributionData,
  PropertyTypesData,
  AccommodatesData,
  AvailabilityData,
  ReviewScoresData,
  FilterOptionsData
} from '../types/stats';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    const errorData = error.response.data as any;
    throw new Error(errorData?.message || 'Error en la respuesta del servidor');
  } else if (error.request) {
    throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
  } else {
    throw new Error(error.message || 'Error desconocido');
  }
};

// Build query params from filters
const buildQueryParams = (filters: StatsFilters): Record<string, any> => {
  const params: Record<string, any> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = value;
    }
  });
  
  return params;
};

/**
 * Get overview statistics
 */
export const getOverview = async (filters: StatsFilters = {}): Promise<OverviewData> => {
  try {
    const response = await apiClient.get<StatsResponse<OverviewData>>('/stats/overview', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get price distribution
 */
export const getPriceDistribution = async (filters: StatsFilters = {}): Promise<PriceDistributionData> => {
  try {
    const response = await apiClient.get<StatsResponse<PriceDistributionData>>('/stats/price-distribution', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get property types distribution
 */
export const getPropertyTypes = async (filters: StatsFilters = {}): Promise<PropertyTypesData> => {
  try {
    const response = await apiClient.get<StatsResponse<PropertyTypesData>>('/stats/property-types', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get accommodates distribution
 */
export const getAccommodates = async (filters: StatsFilters = {}): Promise<AccommodatesData> => {
  try {
    const response = await apiClient.get<StatsResponse<AccommodatesData>>('/stats/accommodates', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get availability statistics
 */
export const getAvailability = async (filters: StatsFilters = {}): Promise<AvailabilityData> => {
  try {
    const response = await apiClient.get<StatsResponse<AvailabilityData>>('/stats/availability', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get review scores statistics
 */
export const getReviewScores = async (filters: StatsFilters = {}): Promise<ReviewScoresData> => {
  try {
    const response = await apiClient.get<StatsResponse<ReviewScoresData>>('/stats/review-scores', {
      params: buildQueryParams(filters),
    });
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get filter options for UI
 */
export const getFilterOptions = async (): Promise<FilterOptionsData> => {
  try {
    const response = await apiClient.get<StatsResponse<FilterOptionsData>>('/stats/filter-options');
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get all statistics at once
 */
export const getAllStats = async (filters: StatsFilters = {}) => {
  try {
    const [
      overview,
      priceDistribution,
      propertyTypes,
      accommodates,
      availability,
      reviewScores
    ] = await Promise.all([
      getOverview(filters),
      getPriceDistribution(filters),
      getPropertyTypes(filters),
      getAccommodates(filters),
      getAvailability(filters),
      getReviewScores(filters)
    ]);

    return {
      overview,
      priceDistribution,
      propertyTypes,
      accommodates,
      availability,
      reviewScores
    };
  } catch (error) {
    throw error;
  }
};
