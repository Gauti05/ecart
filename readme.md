Vibe Commerce - Mock E-Commerce Cart Application
Overview
This repository contains a full-stack shopping cart application built as a coding assignment for a full-stack internship screening. The app allows users to browse products, add/remove them from a shopping cart, adjust quantities, and perform a mock checkout, demonstrating frontend-backend integration.

The focus is on building key e-commerce flows using React (frontend), Node.js/Express (backend), and MongoDB (database). Real payment processing is not included.

Tech Stack
Frontend: React with React Router, Context API for state management, Tailwind CSS for styling
Backend: Node.js, Express.js REST API

Database: MongoDB Atlas with Mongoose ODM

API: RESTful endpoints for products, cart, and checkout

Developer Tools: Axios for HTTP requests, react-hot-toast for notifications


Features
Product Listing: Display 5-10 sample products with name and price

Shopping Cart:

Add products to cart with quantity

Remove products from cart

Update quantity of cart items in real-time

Calculate and display subtotal and total price


Checkout:

Form to enter name and email

Submit cart for mock checkout

Display receipt with total cost and timestamp

Responsive Design: Works on desktop and mobile screens

Error Handling: Form validation and API error feedback


Project Structure
/backend - Express server, Mongoose models, API routes

/frontend - React app with components, context, and API utilities



Setup Instructions
Prerequisites
Node.js and npm installed

MongoDB Atlas account or local MongoDB instance

Git

Backend Setup
1.Navigate to /backend directory:
cd backend


2.Install dependencies:
npm install

3.Create .env file with content:
MONGO_URI=your_mongodb_connection_string
PORT=5000


4.Start backend server:
npm start

Server runs on http://localhost:5000

Frontend Setup
1.Navigate to /frontend directory:
cd frontend


2.Install dependencies:
npm install

3.Start development server:
npm start

