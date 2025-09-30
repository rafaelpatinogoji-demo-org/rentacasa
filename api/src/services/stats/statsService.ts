import Listing from '../../models/Listing';
import {
  StatsFilters,
  OverviewData,
  PriceDistributionData,
  PropertyTypesData,
  AccommodatesData,
  AvailabilityData,
  ReviewScoresData,
  FilterOptionsData
} from '../../types/statsTypes';

/**
 * Build MongoDB match stage from filters
 */
function buildMatchStage(filters: StatsFilters): any {
  const match: any = {};

  // Country filter
  if (filters.country) {
    match['address.country'] = filters.country;
  }

  // Market filter
  if (filters.market) {
    match['address.market'] = filters.market;
  }

  // Property type filter (multiple, comma-separated)
  if (filters.property_type) {
    const types = filters.property_type.split(',').map(t => t.trim()).filter(Boolean);
    if (types.length > 0) {
      match.property_type = { $in: types };
    }
  }

  // Room type filter
  if (filters.room_type) {
    match.room_type = filters.room_type;
  }

  // Accommodates range
  if (filters.accommodates_min !== undefined || filters.accommodates_max !== undefined) {
    match.accommodates = {};
    if (filters.accommodates_min !== undefined) {
      match.accommodates.$gte = filters.accommodates_min;
    }
    if (filters.accommodates_max !== undefined) {
      match.accommodates.$lte = filters.accommodates_max;
    }
  }

  // Bedrooms range
  if (filters.bedrooms_min !== undefined || filters.bedrooms_max !== undefined) {
    match.bedrooms = {};
    if (filters.bedrooms_min !== undefined) {
      match.bedrooms.$gte = filters.bedrooms_min;
    }
    if (filters.bedrooms_max !== undefined) {
      match.bedrooms.$lte = filters.bedrooms_max;
    }
  }

  // Bathrooms range
  if (filters.bathrooms_min !== undefined || filters.bathrooms_max !== undefined) {
    match.bathrooms = {};
    if (filters.bathrooms_min !== undefined) {
      match.bathrooms.$gte = filters.bathrooms_min;
    }
    if (filters.bathrooms_max !== undefined) {
      match.bathrooms.$lte = filters.bathrooms_max;
    }
  }

  // Review score minimum
  if (filters.review_score_min !== undefined) {
    match['review_scores.review_scores_rating'] = { $gte: filters.review_score_min };
  }

  // Amenities (any match - OR logic)
  if (filters.amenities_any) {
    const amenitiesList = filters.amenities_any.split(',').map(a => a.trim()).filter(Boolean);
    if (amenitiesList.length > 0) {
      match.amenities = { $in: amenitiesList };
    }
  }

  // Review date range
  if (filters.review_date_from || filters.review_date_to) {
    match.last_review = {};
    if (filters.review_date_from) {
      match.last_review.$gte = new Date(filters.review_date_from);
    }
    if (filters.review_date_to) {
      match.last_review.$lte = new Date(filters.review_date_to);
    }
  }

  return match;
}

/**
 * Add price conversion and filtering to pipeline
 */
function addPriceStages(pipeline: any[], filters: StatsFilters): void {
  // Convert Decimal128 to number
  pipeline.push({
    $addFields: {
      priceValue: {
        $toDouble: {
          $ifNull: [
            {
              $cond: {
                if: { $eq: [{ $type: '$price' }, 'string'] },
                then: { $toDouble: '$price' },
                else: '$price'
              }
            },
            0
          ]
        }
      }
    }
  });

  // Filter by price range if specified
  if (filters.price_min !== undefined || filters.price_max !== undefined) {
    const priceMatch: any = { priceValue: {} };
    if (filters.price_min !== undefined) {
      priceMatch.priceValue.$gte = filters.price_min;
    }
    if (filters.price_max !== undefined) {
      priceMatch.priceValue.$lte = filters.price_max;
    }
    pipeline.push({ $match: priceMatch });
  }
}

/**
 * 1. Get overview statistics
 */
export async function getOverview(filters: StatsFilters): Promise<OverviewData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price conversion and filtering
  addPriceStages(pipeline, filters);

  // Calculate statistics
  pipeline.push({
    $group: {
      _id: null,
      totalProperties: { $sum: 1 },
      avgPrice: { $avg: '$priceValue' },
      allPrices: { $push: '$priceValue' },
      avgReviews: { $avg: { $ifNull: ['$number_of_reviews', 0] } }
    }
  });

  const result = await Listing.aggregate(pipeline);

  if (!result || result.length === 0) {
    return {
      totalProperties: 0,
      avgPrice: 0,
      avgReviews: 0
    };
  }

  const data = result[0];
  
  // Calculate median
  let medianPrice: number | undefined;
  if (data.allPrices && data.allPrices.length > 0) {
    const sorted = data.allPrices.filter((p: number) => p > 0).sort((a: number, b: number) => a - b);
    if (sorted.length > 0) {
      const mid = Math.floor(sorted.length / 2);
      medianPrice = sorted.length % 2 === 0 
        ? (sorted[mid - 1] + sorted[mid]) / 2 
        : sorted[mid];
    }
  }

  return {
    totalProperties: data.totalProperties || 0,
    avgPrice: Math.round((data.avgPrice || 0) * 100) / 100,
    medianPrice: medianPrice ? Math.round(medianPrice * 100) / 100 : undefined,
    avgReviews: Math.round((data.avgReviews || 0) * 100) / 100
  };
}

/**
 * 2. Get price distribution in buckets
 */
export async function getPriceDistribution(filters: StatsFilters): Promise<PriceDistributionData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price conversion and filtering
  addPriceStages(pipeline, filters);

  // Filter out zero prices
  pipeline.push({ $match: { priceValue: { $gt: 0 } } });

  // Create buckets
  pipeline.push({
    $bucket: {
      groupBy: '$priceValue',
      boundaries: [0, 50, 100, 150, 200, 300, 500, 1000, 10000],
      default: '10000+',
      output: {
        count: { $sum: 1 }
      }
    }
  });

  pipeline.push({ $sort: { _id: 1 } });

  const result = await Listing.aggregate(pipeline);

  const buckets = result.map((bucket: any) => {
    const id = bucket._id;
    let range: string;
    let min: number;
    let max: number;

    if (id === '10000+') {
      range = '$10,000+';
      min = 10000;
      max = Infinity;
    } else {
      const boundaries = [0, 50, 100, 150, 200, 300, 500, 1000, 10000];
      const idx = boundaries.indexOf(id);
      min = id;
      max = boundaries[idx + 1];
      range = `$${min}-$${max}`;
    }

    return {
      range,
      min,
      max,
      count: bucket.count
    };
  });

  return { buckets };
}

/**
 * 3. Get property types distribution
 */
export async function getPropertyTypes(filters: StatsFilters): Promise<PropertyTypesData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price filtering if needed
  addPriceStages(pipeline, filters);

  // Group by property type
  pipeline.push({
    $group: {
      _id: '$property_type',
      count: { $sum: 1 }
    }
  });

  pipeline.push({ $sort: { count: -1 } });

  const result = await Listing.aggregate(pipeline);

  // Calculate total for percentages
  const total = result.reduce((sum: number, item: any) => sum + item.count, 0);

  const items = result
    .filter((item: any) => item._id) // Remove null/undefined types
    .map((item: any) => ({
      type: item._id,
      count: item.count,
      percentage: total > 0 ? Math.round((item.count / total) * 10000) / 100 : 0
    }));

  return { items };
}

/**
 * 4. Get accommodates distribution
 */
export async function getAccommodates(filters: StatsFilters): Promise<AccommodatesData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price filtering if needed
  addPriceStages(pipeline, filters);

  // Filter out null accommodates
  pipeline.push({ $match: { accommodates: { $exists: true, $ne: null } } });

  // Group by accommodates
  pipeline.push({
    $group: {
      _id: '$accommodates',
      count: { $sum: 1 }
    }
  });

  pipeline.push({ $sort: { _id: 1 } });

  const result = await Listing.aggregate(pipeline);

  const points = result.map((item: any) => ({
    accommodates: item._id,
    count: item.count
  }));

  return { points };
}

/**
 * 5. Get availability averages
 */
export async function getAvailability(filters: StatsFilters): Promise<AvailabilityData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price filtering if needed
  addPriceStages(pipeline, filters);

  // Calculate averages
  pipeline.push({
    $group: {
      _id: null,
      d30: { $avg: { $ifNull: ['$availability.availability_30', 0] } },
      d60: { $avg: { $ifNull: ['$availability.availability_60', 0] } },
      d90: { $avg: { $ifNull: ['$availability.availability_90', 0] } },
      d365: { $avg: { $ifNull: ['$availability.availability_365', 0] } }
    }
  });

  const result = await Listing.aggregate(pipeline);

  if (!result || result.length === 0) {
    return { d30: 0, d60: 0, d90: 0, d365: 0 };
  }

  const data = result[0];

  return {
    d30: Math.round((data.d30 || 0) * 100) / 100,
    d60: Math.round((data.d60 || 0) * 100) / 100,
    d90: Math.round((data.d90 || 0) * 100) / 100,
    d365: Math.round((data.d365 || 0) * 100) / 100
  };
}

/**
 * 6. Get review scores statistics
 */
export async function getReviewScores(filters: StatsFilters): Promise<ReviewScoresData> {
  const pipeline: any[] = [];

  // Apply filters
  const match = buildMatchStage(filters);
  if (Object.keys(match).length > 0) {
    pipeline.push({ $match: match });
  }

  // Add price filtering if needed
  addPriceStages(pipeline, filters);

  // Filter properties with review scores
  pipeline.push({
    $match: {
      'review_scores.review_scores_rating': { $exists: true, $ne: null, $gt: 0 }
    }
  });

  // Calculate average and create buckets
  pipeline.push({
    $facet: {
      average: [
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$review_scores.review_scores_rating' }
          }
        }
      ],
      buckets: [
        {
          $bucket: {
            groupBy: '$review_scores.review_scores_rating',
            boundaries: [0, 20, 40, 60, 80, 100],
            default: 'other',
            output: {
              count: { $sum: 1 }
            }
          }
        },
        { $sort: { _id: 1 } }
      ]
    }
  });

  const result = await Listing.aggregate(pipeline);

  if (!result || result.length === 0) {
    return { avgRating: 0, buckets: [] };
  }

  const data = result[0];
  const avgRating = data.average[0]?.avgRating || 0;

  const buckets = data.buckets.map((bucket: any) => {
    const id = bucket._id;
    const boundaries = [0, 20, 40, 60, 80, 100];
    const idx = boundaries.indexOf(id);
    const min = id;
    const max = boundaries[idx + 1];

    return {
      range: `${min}-${max}`,
      count: bucket.count,
      min,
      max
    };
  });

  return {
    avgRating: Math.round(avgRating * 100) / 100,
    buckets
  };
}

/**
 * 7. Get filter options for UI selects
 */
export async function getFilterOptions(filters: StatsFilters): Promise<FilterOptionsData> {
  // Get distinct values for categorical fields
  const [
    countries,
    markets,
    propertyTypes,
    roomTypes,
    amenitiesList
  ] = await Promise.all([
    Listing.distinct('address.country').then(arr => arr.filter(Boolean).sort()),
    Listing.distinct('address.market').then(arr => arr.filter(Boolean).sort()),
    Listing.distinct('property_type').then(arr => arr.filter(Boolean).sort()),
    Listing.distinct('room_type').then(arr => arr.filter(Boolean).sort()),
    Listing.distinct('amenities').then(arr => arr.filter(Boolean).sort())
  ]);

  // Get ranges for numeric fields
  const rangesPipeline = [
    {
      $addFields: {
        priceValue: {
          $toDouble: {
            $ifNull: [
              {
                $cond: {
                  if: { $eq: [{ $type: '$price' }, 'string'] },
                  then: { $toDouble: '$price' },
                  else: '$price'
                }
              },
              0
            ]
          }
        }
      }
    },
    {
      $group: {
        _id: null,
        minPrice: { $min: '$priceValue' },
        maxPrice: { $max: '$priceValue' },
        minAccommodates: { $min: '$accommodates' },
        maxAccommodates: { $max: '$accommodates' },
        minBedrooms: { $min: '$bedrooms' },
        maxBedrooms: { $max: '$bedrooms' },
        minBathrooms: { $min: '$bathrooms' },
        maxBathrooms: { $max: '$bathrooms' },
        minReviewScore: { $min: '$review_scores.review_scores_rating' },
        maxReviewScore: { $max: '$review_scores.review_scores_rating' },
        firstReview: { $min: '$first_review' },
        lastReview: { $max: '$last_review' }
      }
    }
  ];

  const rangesResult = await Listing.aggregate(rangesPipeline);
  const rangesData = rangesResult[0] || {};

  return {
    countries: countries as string[],
    markets: markets as string[],
    property_types: propertyTypes as string[],
    room_types: roomTypes as string[],
    amenities: amenitiesList as string[],
    ranges: {
      price: {
        min: Math.round(rangesData.minPrice || 0),
        max: Math.round(rangesData.maxPrice || 0)
      },
      accommodates: {
        min: rangesData.minAccommodates || 0,
        max: rangesData.maxAccommodates || 0
      },
      bedrooms: {
        min: rangesData.minBedrooms || 0,
        max: rangesData.maxBedrooms || 0
      },
      bathrooms: {
        min: rangesData.minBathrooms || 0,
        max: rangesData.maxBathrooms || 0
      },
      review_score: {
        min: rangesData.minReviewScore || 0,
        max: rangesData.maxReviewScore || 0
      }
    },
    dates: {
      first_review: rangesData.firstReview ? new Date(rangesData.firstReview).toISOString() : null,
      last_review: rangesData.lastReview ? new Date(rangesData.lastReview).toISOString() : null
    }
  };
}
