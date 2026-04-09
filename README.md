# FPS - Floating Population Sensor System

## Overview
Hwaseong City Floating Population Analysis System - A web-based platform for analyzing pedestrian traffic patterns, visitor analytics, and CCTV-based monitoring.

## Tech Stack

### Backend
- **Java 1.8** / **Spring Boot 2.7.1**
- Spring Data JPA / JDBC
- PostgreSQL
- Apache POI (Excel export)
- Thymeleaf

### Frontend
- **React 18** / **TypeScript**
- Redux Toolkit + Redux Saga
- Leaflet.js (GIS/Map)
- Highcharts (Data Visualization)
- Styled Components

## Features
- Real-time floating population monitoring
- Visitor count analytics and predictions
- Average duration analysis by region
- Migration pattern visualization
- CCTV facility management (GIS-based)
- Excel data export
- OMS (Operation Management System) integration

## Project Structure
```
fps/
├── src/main/java/          # Spring Boot backend
│   └── com/eseict/fps/
│       ├── config/         # DB & app configuration
│       ├── controller/     # REST API controllers
│       ├── service/        # Business logic
│       ├── dao/            # Data access layer
│       ├── domain/         # JPA entities
│       └── dto/            # Data transfer objects
├── front/                  # React TypeScript frontend
│   └── src/
│       ├── config/         # App configuration
│       ├── page/           # Page components
│       │   ├── component/  # React components
│       │   ├── saga/       # Redux Saga
│       │   └── store/      # Redux store
│       └── public/         # Static assets
└── pom.xml                 # Maven build config
```

## Setup

### Prerequisites
- Java 1.8+
- Node.js 18+
- PostgreSQL
- Maven

### Configuration
1. Update `src/main/resources/home/system_config.properties` with your database and API credentials
2. Run `mvn clean install` to build
3. Deploy the generated WAR file
