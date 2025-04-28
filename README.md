# AIRBNB Replica Project

## Overview
This project is a replica of the AIRBNB platform, built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete listings, manage user authentication, and add reviews for listings. Additionally, it includes image upload functionality integrated with Cloudinary, map integration using Leaflet, and API requests using Axios.

## Features
- User authentication (Sign up, Log in, Log out).
- View all listings.
- Create, edit, and delete listings.
- Add and delete reviews for listings.
- Upload images for listings using Cloudinary.
- Map integration with Leaflet for displaying listing locations.
- Fetch and display coordinates using Axios.
- Error handling for invalid input and non-existent routes.
- Responsive and user-friendly UI built with Bootstrap and custom CSS.

## Technologies Used
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Frontend**: EJS (Embedded JavaScript templating), Bootstrap.
- **Validation**: Joi.
- **Authentication**: Passport.js with `passport-local` and `passport-local-mongoose`.
- **Image Upload**: Cloudinary with Multer.
- **Map Integration**: Leaflet.js.
- **API Requests**: Axios.
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
4. Set up your Cloudinary account:
   - Create a Cloudinary account at [Cloudinary](https://cloudinary.com/).
   - Obtain your Cloudinary `CLOUD_NAME`, `API_KEY`, and `API_SECRET`.
   - Create a `.env` file in the root directory and add the following:
     ```env
     CLOUDINARY_CLOUD_NAME=<your-cloud-name>
     CLOUDINARY_API_KEY=<your-api-key>
     CLOUDINARY_API_SECRET=<your-api-secret>
     ```
5. Start the MongoDB server:
   ```bash
   mongod
   ```
6. Seed the database with sample data:
   ```bash
   node init/index.js
   ```
7. Run the application:
   ```bash
   node app.js
   ```
8. Open your browser and go to `http://localhost:8080`.

## MVC Structure
This project follows the **Model-View-Controller (MVC)** architecture:

### Models
- **User**: Handles user data and authentication using `passport-local-mongoose`.
- **Listing**: Represents listings with fields like title, description, price, location, owner, and images (stored in Cloudinary).
- **Review**: Represents reviews with fields like rating, comment, and author.

### Views
- **Layouts**: Shared layout templates (e.g., `boilerplate.ejs`).
- **Includes**: Reusable partials like `navbar.ejs`, `footer.ejs`, and `flash.ejs`.
- **Listings**: Templates for listing-related pages (e.g., `index.ejs`, `show.ejs`, `edit.ejs`, `new.ejs`).
- **User**: Templates for user authentication pages (e.g., `login.ejs`, `signup.ejs`).

### Controllers
- **User Controller**: Handles user-related logic (e.g., sign up, login, logout).
- **Listing Controller**: Handles listing-related logic (e.g., create, edit, delete, view listings, upload images, fetch coordinates).
- **Review Controller**: Handles review-related logic (e.g., add, delete reviews).

### Routes
- **User Routes**: Handles routes for user authentication (`/signup`, `/login`, `/logout`).
- **Listing Routes**: Handles routes for listings (`/listings`, `/listings/:id`, etc.).
- **Review Routes**: Handles routes for reviews (`/listings/:id/reviews`).

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
   Displays details of a specific listing, including its reviews, images, and location on a map.

3. **Create a new listing (Form)**  
   **GET** `/listings/new`  
   Renders a form to create a new listing.

4. **Create a new listing (Submit)**  
   **POST** `/listings`  
   Adds a new listing to the database, including uploading an image to Cloudinary and fetching coordinates using Axios.  
   **Validation:** Uses `listingSchema` to validate the input.

5. **Edit a listing (Form)**  
   **GET** `/listings/:id/edit`  
   Renders a form to edit an existing listing.

6. **Edit a listing (Submit)**  
   **PUT** `/listings/:id`  
   Updates an existing listing in the database, including updating images in Cloudinary and coordinates.  
   **Validation:** Uses `listingSchema` to validate the input.

7. **Delete a listing**  
   **DELETE** `/listings/:id`  
   Deletes a listing from the database, including its associated reviews, images from Cloudinary, and map data.

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
- `cloudConfig.js`: Configuration for Cloudinary integration.
- `app.js`: Main application file.
- `schema.js`: Validation schemas for listings and reviews.

## Core Features
- **Responsive UI**: Built with Bootstrap and custom CSS for a user-friendly experience.
- **Map Integration**: Displays listing locations on an interactive map using Leaflet.js.
- **Image Upload**: Allows users to upload images for listings, stored in Cloudinary.
- **Coordinates Fetching**: Automatically fetches and displays coordinates for listings using Axios.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.