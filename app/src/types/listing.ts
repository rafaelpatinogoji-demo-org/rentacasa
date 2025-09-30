// MongoDB Decimal128 type
export interface MongoDecimal {
  $numberDecimal: string;
}

// MongoDB Date type
export interface MongoDate {
  $date: string;
}

// Address structure
export interface Address {
  street?: string;
  suburb?: string;
  government_area?: string;
  market?: string;
  country?: string;
  country_code?: string;
  location?: {
    type: string;
    coordinates: number[];
    is_location_exact?: boolean;
  };
}

// Host information
export interface Host {
  host_id?: string;
  host_url?: string;
  host_name?: string;
  host_location?: string;
  host_about?: string;
  host_response_time?: string;
  host_thumbnail_url?: string;
  host_picture_url?: string;
  host_neighbourhood?: string;
  host_response_rate?: number;
  host_is_superhost?: boolean;
  host_has_profile_pic?: boolean;
  host_identity_verified?: boolean;
  host_listings_count?: number;
  host_total_listings_count?: number;
  host_verifications?: string[];
}

// Images structure
export interface Images {
  thumbnail_url?: string;
  medium_url?: string;
  picture_url?: string;
  xl_picture_url?: string;
}

// Review structure
export interface Review {
  _id?: string;
  date?: MongoDate;
  listing_id?: string;
  reviewer_id?: string;
  reviewer_name?: string;
  comments?: string;
}

// Review scores
export interface ReviewScores {
  review_scores_accuracy?: number;
  review_scores_cleanliness?: number;
  review_scores_checkin?: number;
  review_scores_communication?: number;
  review_scores_location?: number;
  review_scores_value?: number;
  review_scores_rating?: number;
}

// Availability
export interface Availability {
  availability_30?: number;
  availability_60?: number;
  availability_90?: number;
  availability_365?: number;
}

// Main Listing interface
export interface Listing {
  _id: string;
  name: string;
  summary?: string;
  description?: string;
  property_type?: string;
  room_type?: string;
  price?: MongoDecimal;
  bedrooms?: number;
  beds?: number;
  accommodates?: number;
  bathrooms?: MongoDecimal;
  images?: Images;
  address?: Address;
  host?: Host;
  reviews?: Review[];
  amenities?: string[];
  review_scores?: ReviewScores;
  number_of_reviews?: number;
  listing_url?: string;
  last_scraped?: MongoDate;
  calendar_last_scraped?: MongoDate;
  first_review?: MongoDate;
  last_review?: MongoDate;
  minimum_nights?: string;
  maximum_nights?: string;
  cancellation_policy?: string;
  availability?: Availability;
}

// Pagination metadata
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// API Response structure
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

// Listings response data
export interface ListingsData {
  listings: Listing[];
  pagination: Pagination;
}

// Search filters
export interface SearchFilters {
  property_type?: string | null;
  bedrooms?: number | null;
  beds?: number | null;
  min_price?: number | null;
  max_price?: number | null;
  market?: string | null;
}
