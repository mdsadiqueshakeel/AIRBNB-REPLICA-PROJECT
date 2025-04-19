# AIRBNB Replica Project

## Overview
This project is a replica of the AIRBNB platform, built using Node.js, Express, and MongoDB. It allows users to create, read, update, and delete listings.

## Features
- User can view all listings.
- User can create a new listing.
- User can edit an existing listing.
- User can delete a listing.
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
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd AIRBNB Replica Project
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the MongoDB server:
   ```
   mongod
   ```
5. Run the application:
   ```
   node app.js
   ```
6. Open your browser and go to `http://localhost:8080`.

## Directory Structure
- `models/`: Contains Mongoose models.
- `public/`: Contains static assets.
- `utils/`: Contains utility functions and error handling.
- `views/`: Contains EJS templates for rendering pages.
- `app.js`: Main application file.
- `schema.js`: Validation schema for listings.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.