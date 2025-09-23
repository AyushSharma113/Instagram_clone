
# Instagram Clone (MERN Stack)

This is a full-stack Instagram clone application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows users to register, log in, upload and view images, like posts, and interact with other users in a manner similar to the popular Instagram app.

## Features

* **Authentication**: Users can register, log in, and manage their profile using JWT-based authentication.
* **Image Upload**: Users can upload images, and the app will handle image storage with cloud storage (e.g., Cloudinary).
* **Posts**: Users can create posts with captions, view posts from others, and like or comment on them.
* **Likes & Comments**: Users can interact with posts by liking and commenting on them.
* **User Profiles**: Each user has a personal profile, showing their posts, followers, and following information.
* **Following System**: Users can follow/unfollow other users.
* **Responsive UI**: The front-end is designed to be mobile-responsive, mimicking Instagram’s user experience.

## Tech Stack

* **Frontend**:

  * React.js
  * Redux for state management
  * React Router for navigation
  * Axios for HTTP requests

* **Backend**:

  * Node.js with Express.js
  * MongoDB for database management
  * JWT (JSON Web Tokens) for authentication
  * Cloudinary for image upload and storage

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/instagram-clone.git
cd instagram-clone
```

### 2. Backend Setup

#### a. Install dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

#### b. Create `.env` file

Create a `.env` file in the backend directory and add your environment variables (replace the placeholders with your actual values):

```
MONGO_URI=mongodb://localhost:27017/instagram-clone
JWT_SECRET=your-secret-key
CLOUDINARY_URL=your-cloudinary-url
```

* `MONGO_URI`: Your MongoDB connection URI.
* `JWT_SECRET`: Your secret key for signing JWT tokens.
* `CLOUDINARY_URL`: Your Cloudinary URL for image uploads.

#### c. Start the server

Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

#### a. Install dependencies

Navigate to the frontend directory:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

#### b. Create `.env` file

Create a `.env` file in the frontend directory and add the following:

```
REACT_APP_API_URL=http://localhost:5000
```

* `REACT_APP_API_URL`: The URL of your backend server.

#### c. Start the frontend

Start the frontend development server:

```bash
npm start
```

The frontend server will run on `http://localhost:3000`.

## Usage

1. **Registration & Login**: When you first visit the app, you can register a new account or log in with an existing one.
2. **Create a Post**: After logging in, you can create a post by uploading an image and adding a caption.
3. **Explore Posts**: You can browse posts created by other users and interact by liking or commenting on them.
4. **Profile**: You can view your own profile, see the posts you've made, and view your followers and following.
5. **Follow/Unfollow**: You can follow and unfollow users to see their posts in your feed.

## API Endpoints

### Authentication

* **POST /api/auth/register**: Register a new user.
* **POST /api/auth/login**: Log in an existing user and receive a JWT token.
* **GET /api/auth/me**: Get the current user's profile data (requires JWT).

### Posts

* **POST /api/posts**: Create a new post (requires authentication).
* **GET /api/posts**: Get all posts.
* **GET /api/posts/\:id**: Get a specific post by ID.
* **PUT /api/posts/like/\:id**: Like a post (requires authentication).
* **PUT /api/posts/comment/\:id**: Add a comment to a post (requires authentication).

### Users

* **GET /api/users/\:id**: Get a user's profile by ID.
* **PUT /api/users/follow/\:id**: Follow a user (requires authentication).
* **PUT /api/users/unfollow/\:id**: Unfollow a user (requires authentication).

## Deployment

To deploy the application to production:

1. Deploy the backend to a cloud platform (e.g., Heroku, DigitalOcean).
2. Deploy the frontend to a static hosting provider (e.g., Netlify, Vercel).
3. Update the environment variables (e.g., API URL) in the frontend to point to the production backend.

## Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.



Let me know if you need any adjustments or additional sections!
