import { Router } from 'express';
import * as statsController from '../controllers/statsController';

const router = Router();

/**
 * Statistics Routes
 * Base path: /api/v1/stats
 * 
 * All endpoints accept common query parameters for filtering:
 * - country, market, property_type, room_type
 * - price_min, price_max
 * - accommodates_min, accommodates_max
 * - bedrooms_min, bedrooms_max
 * - bathrooms_min, bathrooms_max
 * - review_score_min
 * - amenities_any (comma-separated)
 * - review_date_from, review_date_to (ISO dates)
 */

// 1. Overview statistics
router.get('/overview', statsController.overview);

// 2. Price distribution
router.get('/price-distribution', statsController.priceDistribution);

// 3. Property types distribution
router.get('/property-types', statsController.propertyTypes);

// 4. Accommodates distribution
router.get('/accommodates', statsController.accommodates);

// 5. Availability statistics
router.get('/availability', statsController.availability);

// 6. Review scores statistics
router.get('/review-scores', statsController.reviewScores);

// 7. Filter options for UI
router.get('/filter-options', statsController.filterOptions);

export default router;
