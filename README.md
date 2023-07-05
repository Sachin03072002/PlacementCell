# Placement Cell Management System

This is a web-based application for managing the activities of a placement cell. It allows members of the placement cell to track the placement status of students and organize conferences. The application is built using HTML, CSS, JavaScript for the front-end, and Node.js with Express.js and MongoDB for the backend.

## Features

- **Student Profile:** Each student has a profile that includes their personal information, academic details, and placement status.

- **Placement Tracking:** Members of the placement cell can update and track the placement status of students. They can mark a student as placed or not placed, and provide additional details such as the company name and offer details.

- **Conferences:** The application allows members to organize conferences. These conferences are then updated to the selected student's profile, indicating the conference details and any outcomes.

## Requirements

To run this project locally, you need to have the following software installed:

- Node.js (v14 or above)
- MongoDB (v4 or above)

## Getting Started

1. Clone this repository to your local machine.

   ```
   git clone https://github.com/Sachin03072002/placementCell.git
   ```

2. Navigate to the project directory.

   ```
   cd placement-cell-management
   ```

3. Install the dependencies using npm.

   ```
   npm install
   ```

4. Set up the database connection.

   - Create a new MongoDB database.
   - Rename the `.env.example` file to `.env`.
   - Update the `.env` file with your MongoDB connection details.

5. Start the server.

   ```
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to access the application.

## Directory Structure

The project structure is as follows:

```
├── config
│   └── database.js
├── controllers
│   ├── conferenceController.js
│   └── studentController.js
├── models
│   ├── conference.js
│   └── student.js
├── public
│   ├── css
│   ├── js
│   └── images
├── routes
│   ├── conferenceRoutes.js
│   └── studentRoutes.js
├── views
│   ├── conferences
│   ├── students
│   ├── layouts
│   └── partials
├── app.js
└── README.md
```

- The `config` directory contains the database configuration file.
- The `controllers` directory holds the logic for handling different routes and interactions with the database.
- The `models` directory contains the schema definitions for the database collections.
- The `public` directory stores static files such as CSS, JavaScript, and images.
- The `routes` directory defines the routes for different API endpoints.
- The `views` directory contains the EJS templates for rendering HTML pages.
- The `app.js` file is the main entry point of the application.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request. Make sure to follow the existing coding style and include appropriate test cases.

## License

This project is licensed under the [MIT License](LICENSE).
