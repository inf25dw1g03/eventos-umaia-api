Maia Campus Event Management API – Project Report


| Student Name              | Email                                       |
| ------------------------- | ------------------------------------------- |
| Ángel Parra García        | [A046867@umaia.pt](mailto:A046867@umaia.pt) |
| Marcos Escribano Latorre  | [A048754@umaia.pt](mailto:A048754@umaia.pt) |
| Marcos Martínez Fernández | [A048665@umaia.pt](mailto:A048665@umaia.pt) |


# 1. Project Description

This project consists of the complete development of a backend REST API designed to manage the operational needs of a university campus environment.

The API manages:

Users

Rooms

Events

Tags

Bookings

The project covers:

REST API design

OpenAPI specification

Server implementation with Node.js + Express

MySQL database modeling

Docker environment configuration

CRUD operations

Custom query endpoints

Full runtime testing

The API exposes a structured interface that allows interaction with the campus event system, supporting resource creation, edition, deletion and reporting.

# 2. Repository Structure

The repository follows an organized structure aligned with backend best practices:

# 2. Repository Structure

The repository follows an organized structure aligned with backend best practices:
.
├── express-server/          # Node.js & Express implementation
│   ├── controllers/         # Route controllers
│   ├── services/            # Business logic
│   ├── api/openapi.yaml     # API OpenAPI 3.0 definition
│   ├── Dockerfile           # Application Dockerfile
│   ├── index.js             # Main server entry point
│   └── config/db.js         # Database connection module
│
├── database/
│   └── init.sql             # SQL script: schema & seed data
│
├── docker-compose.yml       # Full environment configuration (API + MySQL)
│
└── README.md                # Project documentation

# 3. Technologies Used
Programming Languages

JavaScript (Node.js)

SQL (MySQL)

YAML (OpenAPI specification)

Frameworks & Libraries

Express.js – HTTP routing and API structure

mysql2 – Database driver for Node.js

Swagger UI – API visualization through OpenAPI

Docker & Docker Compose – Containerized environment

Tools

VS Code

Git & GitHub

Postman / Swagger UI (for testing)

# 4. API Documentation (OpenAPI)

The API is fully documented using OpenAPI 3.0, located in: express-server/api/openapi.yaml
The specification defines:

All endpoints

HTTP methods

Requests & responses

Schemas for each entity (user, room, event, booking, tag)

Data validation rules

Examples

The API can be explored using Swagger at:  http://localhost:8080/api-docs

# 5. Database Design

The database follows a relational structure designed for consistency and referential integrity.
| Table     | Purpose                                         |
| --------- | ----------------------------------------------- |
| `user`    | Stores platform users (students, admins, staff) |
| `room`    | Campus rooms                                    |
| `tag`     | Event classification tags                       |
| `event`   | Events with assigned room and tag               |
| `booking` | Link between a user and an event                |

Relationship Diagram (ERD)
user (1) ────< (N) booking (N) >──── (1) event
event (N) ──── (1) room
event (N) ──── (1) tag
SQL Script

The full database schema + initial data is available in: /database/init.sql

# 6. Implementation Details
Controllers

Each controller delegates logic to a service layer and handles HTTP request/response formatting.

Service Layer

Implements:

CRUD operations for all tables

Validation of foreign keys

Event time conflict detection

Room availability computation

Search operations

Important features implemented

✔ Validation that rooms and tags exist before creating an event
✔ Detection of overlapping events to prevent double booking
✔ Prevention of duplicated bookings
✔ Calculation of available rooms in a time interval
✔ Filtering events by date
✔ Searching events by title/description keywords

All database access is handled using parameterized queries to avoid SQL injection.

# 7. Running the Project
Using Docker (recommended)

Ensure Docker is installed.

In the project root, run: docker compose up

This launches:

MySQL

Node.js API server

The API becomes available at:

http://localhost:8080

Running manually (without Docker)

    1. Start MySQL manually

    2. Import the database: mysql -u root -p < database/init.sql

    3. Install dependencies: cd express-server                 npm install

    4. Start the server: npm start
# 8. Testing

All endpoints were tested via:

Swagger UI

    CRUD operations for all entities

    Edge-case validation

    Error responses

Postman

    Event creation with conflict detection

    Booking workflow

    Custom endpoints testing:

    /rooms/available

    /rooms/occupied

    /events/by-date

    /events/search

# 9. Conclusions

This project allowed the team to learn and practice:

    REST API design

    OpenAPI documentation

    Node.js backend development

    SQL relational modeling

    Docker deployment

    Error handling and validation

    Group collaboration
    
The final result is a complete, modular and functional backend system ready for integration with a frontend or mobile application.