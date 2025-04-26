# AIRBNB Replica Project

## Overview
This project is a replica of the AIRBNB platform, built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete listings.

## Features
- User can view all listings.
- User can create a new listing.
- User can edit an existing listing.
- User can delete a listing.
- User can add and delete reviews for listings.
- Error handling for invalid input.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templating)
- Joi (for validation)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd AIRBNB Replica Project
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the MongoDB server:
   ```bash
   mongod
   ```
5. Run the application:
   ```bash
   node app.js
   ```
6. Open your browser and go to `http://localhost:8080`.

## Routes

### Listings
1. **View all listings**  
   **GET** `/listings`  
   Renders a page displaying all listings.

2. **View a single listing**  
   **GET** `/listings/:id`  
   Displays details of a specific listing, including its reviews.

3. **Create a new listing (Form)**  
   **GET** `/listings/new`  
   Renders a form to create a new listing.

4. **Create a new listing (Submit)**  
   **POST** `/listings`  
   Adds a new listing to the database.  
   **Validation:** Uses `listingSchema` to validate the input.

5. **Edit a listing (Form)**  
   **GET** `/listings/:id/edit`  
   Renders a form to edit an existing listing.

6. **Edit a listing (Submit)**  
   **PUT** `/listings/:id`  
   Updates an existing listing in the database.  
   **Validation:** Uses `listingSchema` to validate the input.

7. **Delete a listing**  
   **DELETE** `/listings/:id`  
   Deletes a listing from the database, including its associated reviews.

### Reviews
1. **Add a review**  
   **POST** `/listings/:id/reviews`  
   Adds a new review to a specific listing.  
   **Validation:** Uses `reviewSchema` to validate the input.

2. **Delete a review**  
   **DELETE** `/listings/:id/reviews/:reviewId`  
   Deletes a specific review from a listing.

### Error Handling
1. **404 Page Not Found**  
   If a route does not exist, the application returns a 404 error with a custom error page.

2. **Error Middleware**  
   Handles all errors and displays an error message with the appropriate status code.

## Directory Structure
- `models/`: Contains Mongoose models.
- `public/`: Contains static assets.
- `utils/`: Contains utility functions and error handling.
- `views/`: Contains EJS templates for rendering pages.
- `routes/`: Contains all routes.
- `app.js`: Main application file.
- `schema.js`: Validation schema for listings and reviews.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.