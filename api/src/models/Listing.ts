import mongoose, { Schema, Document } from 'mongoose';

// Interface for TypeScript
export interface IListing extends Document {
  _id: string;
  name: string;
  summary?: string;
  description?: string;
  property_type?: string;
  room_type?: string;
  price?: any;
  bedrooms?: number;
  beds?: number;
  accommodates?: number;
  bathrooms?: any;
  images?: {
    picture_url?: string;
    thumbnail_url?: string;
    medium_url?: string;
    xl_picture_url?: string;
  };
  address?: {
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
  };
  host?: {
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
  };
  reviews?: Array<{
    _id?: string;
    date?: any;
    listing_id?: string;
    reviewer_id?: string;
    reviewer_name?: string;
    comments?: string;
  }>;
  amenities?: string[];
  review_scores?: {
    review_scores_accuracy?: number;
    review_scores_cleanliness?: number;
    review_scores_checkin?: number;
    review_scores_communication?: number;
    review_scores_location?: number;
    review_scores_value?: number;
    review_scores_rating?: number;
  };
  number_of_reviews?: number;
  listing_url?: string;
  last_scraped?: any;
  calendar_last_scraped?: any;
  first_review?: any;
  last_review?: any;
  minimum_nights?: string;
  maximum_nights?: string;
  cancellation_policy?: string;
  availability?: {
    availability_30?: number;
    availability_60?: number;
    availability_90?: number;
    availability_365?: number;
  };
}

// Schema definition with flexible structure
const ListingSchema = new Schema<IListing>(
  {
    _id: { type: String, required: true },
    name: { type: String },
    summary: { type: String },
    description: { type: String },
    property_type: { type: String, index: true },
    room_type: { type: String, index: true },
    price: { type: Schema.Types.Mixed },
    bedrooms: { type: Number, index: true },
    beds: { type: Number, index: true },
    accommodates: { type: Number },
    bathrooms: { type: Schema.Types.Mixed },
    images: {
      picture_url: { type: String },
      thumbnail_url: { type: String },
      medium_url: { type: String },
      xl_picture_url: { type: String }
    },
    address: {
      street: { type: String },
      suburb: { type: String },
      government_area: { type: String },
      market: { type: String, index: true },
      country: { type: String, index: true },
      country_code: { type: String },
      location: {
        type: { type: String },
        coordinates: [{ type: Number }],
        is_location_exact: { type: Boolean }
      }
    },
    host: {
      host_id: { type: String },
      host_url: { type: String },
      host_name: { type: String },
      host_location: { type: String },
      host_about: { type: String },
      host_response_time: { type: String },
      host_thumbnail_url: { type: String },
      host_picture_url: { type: String },
      host_neighbourhood: { type: String },
      host_response_rate: { type: Number },
      host_is_superhost: { type: Boolean },
      host_has_profile_pic: { type: Boolean },
      host_identity_verified: { type: Boolean },
      host_listings_count: { type: Number },
      host_total_listings_count: { type: Number },
      host_verifications: [{ type: String }]
    },
    reviews: [{
      _id: { type: String },
      date: { type: Schema.Types.Mixed },
      listing_id: { type: String },
      reviewer_id: { type: String },
      reviewer_name: { type: String },
      comments: { type: String }
    }],
    amenities: [{ type: String }],
    review_scores: {
      review_scores_accuracy: { type: Number },
      review_scores_cleanliness: { type: Number },
      review_scores_checkin: { type: Number },
      review_scores_communication: { type: Number },
      review_scores_location: { type: Number },
      review_scores_value: { type: Number },
      review_scores_rating: { type: Number }
    },
    number_of_reviews: { type: Number },
    listing_url: { type: String },
    last_scraped: { type: Schema.Types.Mixed },
    calendar_last_scraped: { type: Schema.Types.Mixed },
    first_review: { type: Schema.Types.Mixed },
    last_review: { type: Schema.Types.Mixed },
    minimum_nights: { type: String },
    maximum_nights: { type: String },
    cancellation_policy: { type: String },
    availability: {
      availability_30: { type: Number },
      availability_60: { type: Number },
      availability_90: { type: Number },
      availability_365: { type: Number }
    }
  },
  {
    collection: 'listingsAndReviews', // Use exact collection name in MongoDB
    timestamps: false, // MongoDB already has its own date fields
    strict: false // Allow flexible schema for MongoDB data
  }
);

// Compound indexes for optimized queries
ListingSchema.index({ property_type: 1, room_type: 1, beds: 1 });
ListingSchema.index({ price: 1, bedrooms: 1 });
ListingSchema.index({ 'address.country': 1, 'address.market': 1 });

// Create and export the model
const Listing = mongoose.model<IListing>('Listing', ListingSchema);

export default Listing;
