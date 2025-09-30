---
description: Create Initial Backend API
auto_execution_mode: 1
---

Here is the improved Step 3 with documentation about the data structure of the collection:

Step 3 — Create Backend API with MongoDB for Airbnb Listings (Read Only)
Objective: Create REST endpoints in /api for GET operations on the listingsAndReviews collection from MongoDB using Node 22 Express TypeScript and Mongoose 8.x following the routes controllers models pattern.
Collection context: The listingsAndReviews collection contains 5555 Airbnb property documents. The documents have fields with special MongoDB types such as price which is an object with $numberDecimal, bathrooms also with $numberDecimal, and dates that are objects with $date. Images come in an images object with picture_url. Location comes in address with fields market for city, suburb, country and location with coordinates. The host comes in a complete host object. Reviews is an array of objects with date and comments.
Instructions for Cascade:
In /api install the additional dependencies you need to work with Mongoose dotenv helmet and express-rate-limit plus their TypeScript types.
Create a .env file in /api with the variables MONGODB_URI PORT and NODE_ENV. IMPORTANT: The Mongo URI must include the database name sample_airbnb at the end of the URI before the query params. Example format: mongodb+srv://user:password@cluster.mongodb.net/sample_airbnb?retryWrites=true. The URI must come from the .env always, never hardcoded.
Configure the MongoDB connection with Mongoose in a separate config file that exports a function to connect. Implement retry logic in case the first connection fails and add a basic healthcheck endpoint at GET /api/v1/health that checks the Mongo connection status.
Create the Mongoose Listing model in /api/src/models/Listing.ts that uses the listingsAndReviews collection. IMPORTANT: Configure the model with collection: 'listingsAndReviews' in the schema options because that is the exact name in Mongo. Define the schema with strict false or Mixed types to allow the flexible structure of Mongo. The main fields are: _id as String, name, summary, description, property_type, room_type, price as Mixed or Schema.Types.Decimal128, bedrooms, beds, accommodates as Number, bathrooms as Mixed, images as object with picture_url, address as object with market suburb country and location with type Point and coordinates, host as object with host_id host_name host_picture_url, reviews as Array, amenities as Array of Strings, review_scores as object with ratings, number_of_reviews. Use timestamps false because Mongo already has its own date fields. Define appropriate indexes if necessary.
Implement three controllers in /api/src/controllers/listingController.ts:
The getAllListings controller should handle pagination logic accepting query params page with default 1 and limit with default 10 and maxLimit of 100. Calculate the correct skip for pagination by multiplying page minus 1 by limit. Use Listing.countDocuments to get totalItems and calculate totalPages. Use Listing.find with skip and limit. The response should include in data an object with listings array and pagination with currentPage totalPages totalItems itemsPerPage hasNextPage calculated as currentPage less than totalPages and hasPreviousPage calculated as currentPage greater than 1.
The getListingById controller should get a specific listing by its ID using the path param id. IMPORTANT: The _id in this collection is String not ObjectId so don't use ObjectId.isValid. Simply search with Listing.findById or Listing.findOne with _id equal to the param. If the listing doesn't exist return 404 with appropriate message. If it exists return the complete listing in data.
The searchListings controller should allow searches with optional query params such as property_type bedrooms beds min_price max_price and market for city. Also implement pagination with page and limit. Build a dynamic query object. For property_type use exact match. For bedrooms and beds use exact match or gte. For min_price and max_price you need to access the price field. For min_price and max_price you need to access the price.numberDecimal field and convert it or make special queries because Mongo saves decimals in special format. For market search in address.market. The response should include found listings and pagination like getAllListings with hasNextPage and hasPreviousPage.

All responses must follow the format with statusCode message and data.
Define the routes in /api/src/routes/listingRoutes.ts that map the REST endpoints to the controllers. Use the prefix /api/v1/listings.
Endpoints to implement in this exact order:

GET /api/v1/listings/search for searches with filters using query params
GET /api/v1/listings/:id to get a specific listing by ID
GET /api/v1/listings to get all listings with pagination using query params page and limit

IMPORTANT: The search route must go BEFORE the route with :id to prevent Express from interpreting search as an ID.
Update src/index.ts to import and use the configured routes, set up security middlewares like helmet cors and rate-limit, connect to Mongo before starting the server, and handle errors globally. Use the healthcheck endpoint to verify Mongo connection.
Configure CORS to allow requests from http://localhost:5173 which is where the frontend runs.
All endpoints must return JSON with statusCode message and data. Errors must return statusCode message and error with code and details. Implement basic validation in the controllers for query params and path params ensuring they are of the correct type and within valid ranges.
Expected result: The backend at port 3000 has three functional endpoints: list all with pagination, get one by ID string, and search with optional filters also paginated. All responses include pagination metadata when applicable with the correct fields hasNextPage and hasPreviousPage. The Mongo connection is stable with retry logic and correctly points to the sample_airbnb database and listingsAndReviews collection. The code is organized in routes controllers and models following the project conventions. The 5555 documents are accessible from the API returning the correct structure with fields like price.$numberDecimal, images.picture_url, address.market for city, and all metadata correctly.
