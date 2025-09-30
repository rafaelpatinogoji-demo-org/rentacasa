import { Router } from 'express';
import {
  getAllListings,
  getListingById,
  searchListings
} from '../controllers/listingController';

const router = Router();

/**
 * @route   GET /api/v1/listings
 * @desc    Get all listings with pagination
 * @query   page, limit
 * @access  Public
 */
router.get('/', getAllListings);

/**
 * @route   GET /api/v1/listings/search
 * @desc    Search listings with filters
 * @query   property_type, bedrooms, beds, min_price, max_price, market, page, limit
 * @access  Public
 */
router.get('/search', searchListings);

/**
 * @route   GET /api/v1/listings/:id
 * @desc    Get a single listing by ID
 * @param   id
 * @access  Public
 */
router.get('/:id', getListingById);

export default router;
