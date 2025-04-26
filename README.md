# AIRBNB Replica Project

## Overview
This project is a replica of the AIRBNB platform, built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete listings, as well as manage user authentication and reviews.

## Features
- User authentication (Sign up, Log in, Log out).
- View all listings.
- Create, edit, and delete listings.
- Add and delete reviews for listings.
- Error handling for invalid input and non-existent routes.

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Frontend**: EJS (Embedded JavaScript templating), Bootstrap.
- **Validation**: Joi.
- **Authentication**: Passport.js with `passport-local` and `passport-local-mongoose`.
- **Other Libraries**: Connect-flash, Express-session, Method-override.

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
5. Seed the database with sample data:
   ```bash
   node init/index.js
   ```
6. Run the application:
   ```bash
   node app.js
   ```
7. Open your browser and go to `http://localhost:8080`.

## Routes

### User Authentication
1. **Sign Up**  
   **GET** `/signup`  
   Renders the sign-up form.  

   **POST** `/signup`  
   Registers a new user and redirects to the listings page.

2. **Log In**  
   **GET** `/login`  
   Renders the login form.  

   **POST** `/login`  
   Authenticates the user and redirects to the listings page.

3. **Log Out**  
   **GET** `/logout`  
   Logs out the user and redirects to the home page.

### Listings
1. **View all listings**  
   **GET** `/listings`  
   Displays all available listings.

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
- `models/`: Contains Mongoose models for `Listing`, `Review`, and `User`.
- `routes/`: Contains route handlers for listings, reviews, and user authentication.
- `views/`: Contains EJS templates for rendering pages.
  - `layouts/`: Layout templates.
  - `includes/`: Reusable partials like navbar and footer.
  - `listings/`: Templates for listing-related pages.
  - `User/`: Templates for user authentication pages.
- `public/`: Contains static assets like CSS and JavaScript files.
- `utils/`: Contains utility functions like error handling and async wrapper.
- `init/`: Contains scripts for initializing the database with sample data.
- `app.js`: Main application file.
- `schema.js`: Validation schemas for listings and reviews.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.