# Fusion - Full Stack Social Media Application

A unique social media platform that combines the best features of Twitter, Reddit, Quora, and Threads.

## Features

- **Multi-format Feeds**: Tweet-style updates, topic-based boards, Q&A threads, and nested discussions
- **Rich Interactions**: Post text and images, comment, like, upvote/downvote, and follow users/topics
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Secure Authentication**: JWT-based authentication system

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Spring Boot (Java)
- Spring Security with JWT
- RESTful API architecture
- JPA/Hibernate for ORM

### Database
- MySQL

## Setup Instructions

### Prerequisites
- Node.js and npm
- Java 17 or higher
- Maven
- MySQL running on localhost:3306 with user "root"

### Backend Setup
1. Navigate to the `backend` directory
2. Run `mvn spring-boot:run`
3. The server will start on http://localhost:8080

### Frontend Setup
1. Navigate to the `src` directory
2. Run `npm install` (first time only)
3. Run `npm run dev`
4. The development server will start on http://localhost:5173

## API Documentation

The API documentation is available at http://localhost:8080/swagger-ui.html when the backend is running.