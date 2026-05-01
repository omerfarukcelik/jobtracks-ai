# Initial Database Schema

```mermaid
erDiagram
    USER ||--o{ APPLICATION : creates
    USER ||--o{ RESUME : saves
    USER ||--o{ USER_SETTING : has

    USER {
        int id
        string email
        string username
        string password
        datetime created_at
    }

    APPLICATION {
        int id
        int user_id
        string company_name
        string job_title
        string status
        string location
        string salary_range
        date date_applied
        text notes
        datetime created_at
    }

    RESUME {
        int id
        int user_id
        string title
        text content
        datetime created_at
    }

    USER_SETTING {
        int id
        int user_id
        boolean email_notifications
    }
```

## Users
- id
- full_name
- username
- email
- password
- created_at

## JobApplications
- id
- user_id
- job_title
- company_name
- location
- job_url
- salary_range
- status
- date_applied
- notes
- created_at

## Resume
- id
- user_id
- title
- content
- created_at

## User Settings
- id
- user_id
- email_notif
