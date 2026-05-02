# Initial Database Schema
<img width="961" height="901" alt="image" src="https://github.com/user-attachments/assets/56aff4ea-acc9-4b20-9fa5-53f79e066d73" />

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
