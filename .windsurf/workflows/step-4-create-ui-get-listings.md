---
description: Create Frontend React to Consume Airbnb Listings API
auto_execution_mode: 1
---

Step 4 — Create Initial React Frontend for Airbnb Listings (Without Filter Functionality)
Objective: Create an interface in /app using React TypeScript and React-Bootstrap with a two-column layout. Left column with filters without functionality and right column showing listings in cards with functional pagination.
Instructions for Cascade:
Make sure /app already has react-bootstrap bootstrap and axios installed. If not, install them.
Create TypeScript interfaces in /app/src/types or inline that exactly match the backend response structure. IMPORTANT: The backend returns data.listings not data.docs and pagination with hasNextPage and hasPreviousPage not hasPrevPage. Define interfaces for Listing Pagination and ApiResponse to maintain type safety.
Create a service in /app/src/services/listingService.ts that encapsulates API calls using Axios. The service should have a getAllListings method with page and limit params. The base URL should be http://localhost:3000/api/v1. Implement basic error handling. The service should return the complete structure with listings and pagination from response.data.data.
Create React components in /app/src/components:
A ListingCard component that receives a listing as prop and displays it in a React-Bootstrap Card. It should show an image if available or a placeholder, listing name, property type property_type, price per night formatted from the Decimal128 object from Mongo, number of bedrooms, number of beds, and city extracted from address.market or address.suburb or location according to structure. Make it visually appealing with good spacing and clear typography using Bootstrap classes.
A FilterSidebar component that renders a filter panel in the left column. It should include three filter sections WITHOUT functionality yet, only the UI:

A Form.Select or list to select city with example options
A Form.Select or input for number of bedrooms with common options
Two Form.Control type number for minimum and maximum price range

Use React-Bootstrap Form components. The filters should look professional but don't need to do anything yet. Add a title like "Filters" at the top of the sidebar and an "Apply Filters" button disabled or without functionality.
A CustomPagination component that receives currentPage totalPages hasNextPage hasPreviousPage and callbacks for onNext and onPrevious. Use React-Bootstrap Pagination with Pagination.Prev Pagination.Item and Pagination.Next. Disable buttons when there is no next or previous page based on the hasNextPage and hasPreviousPage flags, not on manual calculations.
Update /app/src/App.tsx to be the main page with a two-column layout:
Use React-Bootstrap Container Row and Col to create the layout. The left column should be Col md={3} for the FilterSidebar. The right column should be Col md={9} to display the listings.
Maintain state for listings pagination loading and error using useState with appropriate TypeScript types.
When mounting the component, load the first page of listings by calling getAllListings with page 1 and limit 12. Use useEffect with an empty dependency array.
In the left column, render the FilterSidebar with a white or very light gray background. In the right column, render a title like "Available Properties", then show a centered React-Bootstrap Spinner if loading, then render the ListingCards in a grid using Row and Col sm={12} md={6} lg={4} to make them responsive with 3 cards per row on large screens, and finally the CustomPagination component centered at the bottom.
Implement handleNextPage and handlePreviousPage functions that update the currentPage and call the service to load the new page of listings. Add automatic scroll to top when changing pages using window.scrollTo.
Use a very light gray background #f8f9fa for the body and white Cards for the listings. The FilterSidebar should have a white or similar background to stand out.
Implement basic error handling that shows a React-Bootstrap Alert variant danger if something fails with the error message.
IMPORTANT: Make sure the property names exactly match what the backend returns: listings not docs, hasNextPage not hasNext, hasPreviousPage not hasPrev.
Expected result: The frontend at port 5173 displays a two-column layout. Left with filters that look good but don't do anything yet, with example options for city, bedrooms, and prices. Right with responsive grid of listings in cards showing real data from the backend including images, names, prices, locations, and features. Functional pagination that allows navigation between approximately 463 pages with 12 items per page. The UI is clean, responsive, and professional using React-Bootstrap. The 5555 listings are correctly loaded from the GET /api/v1/listings endpoint with automatic scroll when changing pages.
