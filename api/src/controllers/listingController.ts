import { Request, Response } from 'express';
import Listing from '../models/Listing';

/**
 * Get all listings with pagination
 * Query params: page (default: 1), limit (default: 10, max: 100)
 */
export const getAllListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    
    if (page < 1 || limit < 1) {
      res.status(400).json({
        statusCode: 400,
        message: 'Page and limit must be positive numbers',
        error: { code: 'INVALID_PARAMS', message: 'Invalid pagination parameters' }
      });
      return;
    }

    const skip = (page - 1) * limit;

    // Execute count and find in parallel for better performance
    const [totalItems, listings] = await Promise.all([
      Listing.countDocuments(),
      Listing.find()
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      statusCode: 200,
      message: 'Listings retrieved successfully',
      data: {
        listings,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error in getAllListings:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: { code: 'SERVER_ERROR', message: 'Failed to retrieve listings' }
    });
  }
};

/**
 * Get a single listing by ID
 * Path param: id
 */
export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        statusCode: 400,
        message: 'Listing ID is required',
        error: { code: 'MISSING_ID', message: 'ID parameter is missing' }
      });
      return;
    }

    // Note: _id in this collection is String, not ObjectId
    const listing = await Listing.findOne({ _id: id }).select('-__v').lean();

    if (!listing) {
      res.status(404).json({
        statusCode: 404,
        message: 'Listing not found',
        error: { code: 'NOT_FOUND', message: `No listing found with ID: ${id}` }
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Listing retrieved successfully',
      data: listing
    });
  } catch (error) {
    console.error('Error in getListingById:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: { code: 'SERVER_ERROR', message: 'Failed to retrieve listing' }
    });
  }
};

/**
 * Search listings with filters
 * Query params: property_type, bedrooms, beds, min_price, max_price, market, page, limit
 */
export const searchListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      property_type,
      bedrooms,
      beds,
      min_price,
      max_price,
      market
    } = req.query;

    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);

    if (page < 1 || limit < 1) {
      res.status(400).json({
        statusCode: 400,
        message: 'Page and limit must be positive numbers',
        error: { code: 'INVALID_PARAMS', message: 'Invalid pagination parameters' }
      });
      return;
    }

    // Build dynamic filter query
    const filter: any = {};

    if (property_type) {
      filter.property_type = property_type;
    }

    if (bedrooms) {
      const bedroomsNum = parseInt(bedrooms as string);
      if (!isNaN(bedroomsNum)) {
        filter.bedrooms = bedroomsNum;
      }
    }

    if (beds) {
      const bedsNum = parseInt(beds as string);
      if (!isNaN(bedsNum)) {
        filter.beds = bedsNum;
      }
    }

    // Price filtering (MongoDB Decimal128 handling)
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) {
        const minPriceNum = parseFloat(min_price as string);
        if (!isNaN(minPriceNum)) {
          filter['price.$numberDecimal'] = { ...filter['price.$numberDecimal'], $gte: minPriceNum.toString() };
        }
      }
      if (max_price) {
        const maxPriceNum = parseFloat(max_price as string);
        if (!isNaN(maxPriceNum)) {
          filter['price.$numberDecimal'] = { ...filter['price.$numberDecimal'], $lte: maxPriceNum.toString() };
        }
      }
    }

    if (market) {
      filter['address.market'] = market;
    }

    const skip = (page - 1) * limit;

    // Execute count and find in parallel
    const [totalItems, listings] = await Promise.all([
      Listing.countDocuments(filter),
      Listing.find(filter)
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      statusCode: 200,
      message: 'Search completed successfully',
      data: {
        listings,
        filters: {
          property_type: property_type || null,
          bedrooms: bedrooms ? parseInt(bedrooms as string) : null,
          beds: beds ? parseInt(beds as string) : null,
          min_price: min_price ? parseFloat(min_price as string) : null,
          max_price: max_price ? parseFloat(max_price as string) : null,
          market: market || null
        },
        pagination: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error in searchListings:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: { code: 'SERVER_ERROR', message: 'Failed to search listings' }
    });
  }
};
