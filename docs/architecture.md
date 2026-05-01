# System Architecture
```mermaid
flowchart TD
    A[User] --> B[Next.js Frontend]
    B --> C[Django REST API]
    C --> D[PostgreSQL Database]
    C --> E[JWT Authentication]
    C --> F[AI Recommendation Service - Future]
```


## Frontend
Next.js application responsible for UI, authentication pages, dashboard, and job application management.

## Backend
Django REST API providing authentication, job application CRUD operations, and future recommendation logic.

## Database
PostgreSQL stores users, job applications, preferences, and future recommendation-related data.

## Future AI Layer
A recommendation engine will analyze a user's saved and applied jobs, preferences, and resume content to suggest relevant roles.
