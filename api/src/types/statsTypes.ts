/**
 * Statistics Module Types
 * Defines all interfaces for the stats API endpoints
 */

/**
 * Common filters applied across all stats endpoints
 */
export interface StatsFilters {
  country?: string;
  market?: string;
  property_type?: string; // comma-separated
  room_type?: string;
  price_min?: number;
  price_max?: number;
  accommodates_min?: number;
  accommodates_max?: number;
  bedrooms_min?: number;
  bedrooms_max?: number;
  bathrooms_min?: number;
  bathrooms_max?: number;
  review_score_min?: number;
  amenities_any?: string; // comma-separated
  review_date_from?: string; // ISO date
  review_date_to?: string; // ISO date
}

/**
 * Base response structure for all stats endpoints
 */
export interface StatsResponse<T> {
  statusCode: number;
  message: string;
  meta: {
    filters: StatsFilters;
    generated_at: string;
  };
  data: T;
}

/**
 * Overview endpoint data
 */
export interface OverviewData {
  totalProperties: number;
  avgPrice: number;
  medianPrice?: number;
  avgReviews: number;
}

/**
 * Price distribution endpoint data
 */
export interface PriceDistributionData {
  buckets: Array<{
    range: string;
    count: number;
    min: number;
    max: number;
  }>;
}

/**
 * Property types endpoint data
 */
export interface PropertyTypesData {
  items: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

/**
 * Accommodates endpoint data
 */
export interface AccommodatesData {
  points: Array<{
    accommodates: number;
    count: number;
  }>;
}

/**
 * Availability endpoint data
 */
export interface AvailabilityData {
  d30: number;
  d60: number;
  d90: number;
  d365: number;
}

/**
 * Review scores endpoint data
 */
export interface ReviewScoresData {
  avgRating: number;
  buckets?: Array<{
    range: string;
    count: number;
    min: number;
    max: number;
  }>;
}

/**
 * Filter options endpoint data
 */
export interface FilterOptionsData {
  countries: string[];
  markets: string[];
  property_types: string[];
  room_types: string[];
  amenities: string[];
  ranges: {
    price: { min: number; max: number };
    accommodates: { min: number; max: number };
    bedrooms: { min: number; max: number };
    bathrooms: { min: number; max: number };
    review_score: { min: number; max: number };
  };
  dates: {
    first_review: string | null;
    last_review: string | null;
  };
}
