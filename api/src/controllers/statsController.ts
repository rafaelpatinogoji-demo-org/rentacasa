import { Request, Response } from 'express';
import {
  getOverview,
  getPriceDistribution,
  getPropertyTypes,
  getAccommodates,
  getAvailability,
  getReviewScores,
  getFilterOptions
} from '../services/stats/statsService';
import { StatsFilters, StatsResponse } from '../types/statsTypes';

/**
 * Parse and validate query parameters into StatsFilters
 */
function parseFilters(query: any): StatsFilters {
  const filters: StatsFilters = {};

  // String filters
  if (query.country) filters.country = String(query.country);
  if (query.market) filters.market = String(query.market);
  if (query.property_type) filters.property_type = String(query.property_type);
  if (query.room_type) filters.room_type = String(query.room_type);
  if (query.amenities_any) filters.amenities_any = String(query.amenities_any);

  // Numeric filters (with validation)
  if (query.price_min !== undefined) {
    const val = Number(query.price_min);
    if (!isNaN(val) && val >= 0) filters.price_min = val;
  }
  if (query.price_max !== undefined) {
    const val = Number(query.price_max);
    if (!isNaN(val) && val >= 0) filters.price_max = val;
  }
  if (query.accommodates_min !== undefined) {
    const val = Number(query.accommodates_min);
    if (!isNaN(val) && val >= 0) filters.accommodates_min = val;
  }
  if (query.accommodates_max !== undefined) {
    const val = Number(query.accommodates_max);
    if (!isNaN(val) && val >= 0) filters.accommodates_max = val;
  }
  if (query.bedrooms_min !== undefined) {
    const val = Number(query.bedrooms_min);
    if (!isNaN(val) && val >= 0) filters.bedrooms_min = val;
  }
  if (query.bedrooms_max !== undefined) {
    const val = Number(query.bedrooms_max);
    if (!isNaN(val) && val >= 0) filters.bedrooms_max = val;
  }
  if (query.bathrooms_min !== undefined) {
    const val = Number(query.bathrooms_min);
    if (!isNaN(val) && val >= 0) filters.bathrooms_min = val;
  }
  if (query.bathrooms_max !== undefined) {
    const val = Number(query.bathrooms_max);
    if (!isNaN(val) && val >= 0) filters.bathrooms_max = val;
  }
  if (query.review_score_min !== undefined) {
    const val = Number(query.review_score_min);
    if (!isNaN(val) && val >= 0) filters.review_score_min = val;
  }

  // Date filters (with validation)
  if (query.review_date_from) {
    try {
      const date = new Date(query.review_date_from);
      if (!isNaN(date.getTime())) {
        filters.review_date_from = date.toISOString();
      }
    } catch (e) {
      // Invalid date, ignore
    }
  }
  if (query.review_date_to) {
    try {
      const date = new Date(query.review_date_to);
      if (!isNaN(date.getTime())) {
        filters.review_date_to = date.toISOString();
      }
    } catch (e) {
      // Invalid date, ignore
    }
  }

  return filters;
}

/**
 * Build standard stats response
 */
function buildResponse<T>(data: T, filters: StatsFilters, message: string): StatsResponse<T> {
  return {
    statusCode: 200,
    message,
    meta: {
      filters,
      generated_at: new Date().toISOString()
    },
    data
  };
}

/**
 * GET /api/v1/stats/overview
 * Returns KPIs: totalProperties, avgPrice, medianPrice, avgReviews
 */
export async function overview(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getOverview(filters);
    res.json(buildResponse(data, filters, 'Overview statistics retrieved successfully'));
  } catch (error: any) {
    console.error('Error in overview:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve overview statistics',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/price-distribution
 * Returns price buckets with counts
 */
export async function priceDistribution(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getPriceDistribution(filters);
    res.json(buildResponse(data, filters, 'Price distribution retrieved successfully'));
  } catch (error: any) {
    console.error('Error in priceDistribution:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve price distribution',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/property-types
 * Returns property types with counts and percentages
 */
export async function propertyTypes(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getPropertyTypes(filters);
    res.json(buildResponse(data, filters, 'Property types retrieved successfully'));
  } catch (error: any) {
    console.error('Error in propertyTypes:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve property types',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/accommodates
 * Returns accommodates distribution
 */
export async function accommodates(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getAccommodates(filters);
    res.json(buildResponse(data, filters, 'Accommodates distribution retrieved successfully'));
  } catch (error: any) {
    console.error('Error in accommodates:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve accommodates distribution',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/availability
 * Returns availability averages (d30, d60, d90, d365)
 */
export async function availability(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getAvailability(filters);
    res.json(buildResponse(data, filters, 'Availability statistics retrieved successfully'));
  } catch (error: any) {
    console.error('Error in availability:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve availability statistics',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/review-scores
 * Returns review scores statistics
 */
export async function reviewScores(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getReviewScores(filters);
    res.json(buildResponse(data, filters, 'Review scores retrieved successfully'));
  } catch (error: any) {
    console.error('Error in reviewScores:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve review scores',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}

/**
 * GET /api/v1/stats/filter-options
 * Returns available filter options for UI selects
 */
export async function filterOptions(req: Request, res: Response): Promise<void> {
  try {
    const filters = parseFilters(req.query);
    const data = await getFilterOptions(filters);
    res.json(buildResponse(data, filters, 'Filter options retrieved successfully'));
  } catch (error: any) {
    console.error('Error in filterOptions:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Failed to retrieve filter options',
      error: {
        code: 'STATS_ERROR',
        message: error.message || 'An error occurred while processing statistics'
      }
    });
  }
}
