/**
 * Statistics Types
 * Types for the statistics API responses
 */

export interface StatsFilters {
  country?: string;
  market?: string;
  property_type?: string;
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
  amenities_any?: string;
  review_date_from?: string;
  review_date_to?: string;
}

export interface StatsResponse<T> {
  statusCode: number;
  message: string;
  meta: {
    filters: StatsFilters;
    generated_at: string;
  };
  data: T;
}

export interface OverviewData {
  totalProperties: number;
  avgPrice: number;
  medianPrice?: number;
  avgReviews: number;
}

export interface PriceDistributionBucket {
  range: string;
  min: number;
  max: number;
  count: number;
}

export interface PriceDistributionData {
  buckets: PriceDistributionBucket[];
}

export interface PropertyTypeItem {
  type: string;
  count: number;
  percentage: number;
}

export interface PropertyTypesData {
  items: PropertyTypeItem[];
}

export interface AccommodatesPoint {
  accommodates: number;
  count: number;
}

export interface AccommodatesData {
  points: AccommodatesPoint[];
}

export interface AvailabilityData {
  d30: number;
  d60: number;
  d90: number;
  d365: number;
}

export interface ReviewScoresBucket {
  range: string;
  min: number;
  max: number;
  count: number;
}

export interface ReviewScoresData {
  avgRating: number;
  buckets?: ReviewScoresBucket[];
}

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
