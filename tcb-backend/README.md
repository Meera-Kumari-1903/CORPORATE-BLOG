# Corporate Blog Backend API

A scalable backend API for a corporate blogging platform built using Node.js, Express, TypeScript, PostgreSQL, and Prisma.

This backend powers a modern blogging system similar to platforms like Medium, Dev.to, and Hashnode.

---

## Tech Stack

Backend Framework

* Node.js
* Express.js

Language

* TypeScript

Database

* PostgreSQL

ORM

* Prisma ORM

Authentication

* JWT (JSON Web Tokens)

Security

* API Rate Limiting
* Password Hashing

---

## Project Architecture

src
├── controllers
├── services
├── routes
├── middlewares
├── config
├── utils

prisma
├── schema.prisma

---

## Features

### Authentication

* User registration
* User login
* JWT authentication
* Password hashing

### Blog Post Management

* Create post
* Update post
* Delete post
* Get post by slug
* Get all posts

### Post Engagement

* Post views counter
* Like posts
* Comment on posts
* Bookmark posts

### Advanced Blog Features

* Trending posts
* Most viewed posts
* Recommended posts

### Performance & Security

* API rate limiting
* Input validation
* Error handling

---

## API Endpoints

Authentication
POST /api/auth/register
POST /api/auth/login

Posts
GET /api/posts
GET /api/posts/:slug
POST /api/posts
PUT /api/posts/:slug
DELETE /api/posts/:slug

Engagement
POST /api/posts/:slug/like
POST /api/posts/:slug/comment

Bookmarks
POST /api/bookmarks
GET /api/bookmarks

Trending & Recommendations
GET /api/posts/trending
GET /api/posts/most-viewed
GET /api/posts/recommended

---

## Installation

Clone the repository

git clone https://github.com/YOUR_USERNAME/corporate-blog-backend.git

Navigate into project

cd corporate-blog-backend

Install dependencies

npm install

---

## Environment Variables

Create a .env file and add:

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key

PORT=4000

---

## Run the Server

Development mode

npm run dev

Production mode

npm run build
npm start

---

## Future Improvements

* Redis caching
* Role based access control
* Image upload for posts
* Full text search

---

## Author

Meera Kumari

Aspiring Data Scientist and Backend Developer
