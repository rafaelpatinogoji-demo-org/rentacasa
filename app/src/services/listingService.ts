import axios, { AxiosError } from 'axios';
import { ApiResponse, ListingsData } from '../types/listing';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    // Server responded with error
    const errorData = error.response.data as any;
    throw new Error(errorData?.message || 'Error en la respuesta del servidor');
  } else if (error.request) {
    // Request made but no response
    throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
  } else {
    // Something else happened
    throw new Error(error.message || 'Error desconocido');
  }
};

/**
 * Get all listings with pagination
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 12)
 * @returns Promise with listings and pagination data
 */
export const getAllListings = async (
  page: number = 1,
  limit: number = 12
): Promise<ListingsData> => {
  try {
    const response = await apiClient.get<ApiResponse<ListingsData>>('/listings', {
      params: { page, limit },
    });

    // Return the data which contains listings and pagination
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Get a single listing by ID
 * @param id - Listing ID
 * @returns Promise with listing data
 */
export const getListingById = async (id: string): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(`/listings/${id}`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

/**
 * Search listings with filters
 * @param filters - Search filters object
 * @param page - Page number
 * @param limit - Items per page
 * @returns Promise with filtered listings and pagination data
 */
export const searchListings = async (
  filters: {
    property_type?: string;
    bedrooms?: number;
    beds?: number;
    min_price?: number;
    max_price?: number;
    market?: string;
  },
  page: number = 1,
  limit: number = 12
): Promise<ListingsData> => {
  try {
    const params: any = { page, limit };
    
    // Add filters to params if they exist
    if (filters.property_type) params.property_type = filters.property_type;
    if (filters.bedrooms) params.bedrooms = filters.bedrooms;
    if (filters.beds) params.beds = filters.beds;
    if (filters.min_price) params.min_price = filters.min_price;
    if (filters.max_price) params.max_price = filters.max_price;
    if (filters.market) params.market = filters.market;

    const response = await apiClient.get<ApiResponse<ListingsData>>('/listings/search', {
      params,
    });

    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};
