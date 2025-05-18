# Express Blog API

This is a simple Express-based API for managing blog posts. It includes CRUD (Create, Read, Update, Delete) operations for blog posts with features like authentication, rate limiting, and database connectivity.

## Features

- **Create a Post**: Allows users to add new blog posts.
- **Get All Posts**: Fetches all blog posts.
- **Get Post by ID**: Fetches a specific post by its ID.
- **Update Post**: Updates a specific post by ID.
- **Delete Post**: Deletes a specific post by ID.
- **JWT Authentication**: Ensures that all API endpoints are protected by JSON Web Token (JWT) authentication.
- **Rate Limiting**: Protects the API from abuse by limiting the number of requests from a user.

## Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `body-parser`: Middleware for parsing request bodies.
- `pg-promise`: PostgreSQL database query library.
- `jsonwebtoken`: Library for signing and verifying JSON Web Tokens.
- `express-rate-limit`: Simple rate-limiting middleware for Express.