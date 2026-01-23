Secure API with JWT Authentication
---------------------------------
A production-style Express API secured with JSON Web Tokens (JWT), paired with a lightweight frontend hosted on GitHub Pages. This project demonstrates authentication, authorization, API security best practices, and client–server integration.

Live Demo
--------------------------------
Frontend (GitHub Pages)
https://dzillo1.github.io/secure-api-demo/client/

Secure API (Render)
https://secure-api-demo.onrender.com

Project Overview
--------------------------------
This project was built to demonstrate real-world API security patterns, including:

JWT-based authentication

Protected API routes using middleware

Secure client–server communication

Token persistence and logout handling

Clear separation of frontend and backend deployments

The API is deployed on Render.

Tech Stack
--------------------------------
    Backend
    -------
    Node.js

    Express

    JSON Web Tokens (JWT)

    dotenv

    CORS middleware

    Deployed on Render

    Frontend
    -------
    Vanilla HTML / JavaScript

    Fetch API

    JWT persistence using localStorage

    Hosted on GitHub Pages

    Authentication Flow
--------------------------------
User logs in via /auth/login

API returns a signed JWT

Frontend stores JWT in localStorage

JWT is sent via Authorization: Bearer <token> header

Protected routes validate the token using middleware

Expired or invalid tokens trigger automatic logout