# Job Recommendation Engine

A backend API that recommends jobs to candidates based on their **skills, experience, location, and expected salary**.

The system uses a rule-based scoring algorithm to rank eligible jobs from the most relevant to the least relevant.

## Features

* Create candidates
* Create jobs
* Generate ranked job recommendations
* Support `limit` query parameter for top-N recommendations
* Must-have skill hard filtering
* Nice-to-have skill scoring
* Experience-based scoring
* Location-based scoring
* Salary compatibility scoring
* Input validation
* PostgreSQL database
* Unit tests for recommendation scoring
* RESTful API architecture
* Environment-based configuration

---

## Tech Stack

* **Node.js 20** (API container uses Alpine image)
* **Express.js**
* **PostgreSQL 16**
* **JavaScript (ES Modules)**
* **pg**
* **dotenv**
* **Git / GitHub**

---

# Project Structure

```text
job-recommendation-engine/
├── package.json
├── package-lock.json
├── .gitignore
├── .env
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── controllers/
│   │   ├── candidateController.js
│   │   ├── jobController.js
│   │   ├── recommendationController.js
│   │   └── reverseRecommendationController.js
│   │
│   ├── db/
│   │   ├── connection.js
│   │   └── migrations/
│   │       └── 001_create_tables.sql
│   │
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── jobRoutes.js
│   │
│   ├── scoring/
│   │   ├── skillScore.js
│   │   ├── experienceScore.js
│   │   ├── locationScore.js
│   │   ├── salaryScore.js
│   │   └── scoreJob.js
│   │
│   ├── services/
│   │   ├── candidateService.js
│   │   ├── jobService.js
│   │   ├── recommendationService.js
│   │   └── reverseRecommendationService.js
│   │
│   └── validators/
│       ├── candidateValidator.js
│       └── jobValidator.js
│
└── tests/
    └── scoreJob.test.js
```

---

# Prerequisites

Make sure the following are installed:

* Node.js 20+
* npm
* PostgreSQL 16+

---

# Docker Compose Setup

This project includes a working Docker Compose setup for local development.

## 1. Build and start the application

```bash
docker compose up -d --build
```

This starts:

* The API container using Node.js 20 Alpine
* A PostgreSQL 16 database container
* The API on port `3000`

The database is initialized using:

```text
src/db/migrations/001_create_tables.sql
```

PostgreSQL is used over the internal Docker network as `postgres:5432` and does not need to be exposed on the host as port `5432`.

## 2. Check the running containers

```bash
docker compose ps
```

## 3. Test the API

```bash
curl http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok"
}
```

## 4. Stop the application

```bash
docker compose down
```

---

# Local Setup

## 1. Clone the repository

```bash
git clone <repository-url>
cd job-recommendation-engine
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create PostgreSQL database

Create a database named:

```text
job_recommendation_engine
```

Using PostgreSQL CLI:

```bash
createdb job_recommendation_engine
```

Or create the database through any PostgreSQL GUI such as pgAdmin.

## 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=job_recommendation_engine
```

A `.env.example` file is included in the repository so that the required environment variables are clear without exposing credentials.

## 5. Run database migration

Run:

```bash
psql -U postgres -d job_recommendation_engine -f src/db/migrations/001_create_tables.sql
```

This creates the required tables:

* `candidates`
* `jobs`

## 6. Start the server

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

## 7. Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

---

# API Endpoints

## 1. Create Candidate

```http
POST /candidates
```

### Request Body

```json
{
  "name": "Vishal Vishwakarma",
  "skills": [
    "Node.js",
    "Express.js",
    "PostgreSQL"
  ],
  "yearsOfExperience": 1.6,
  "location": "Bilaspur",
  "expectedSalary": 1200000
}
```

### Example Response

```json
{
  "message": "Candidate created successfully",
  "candidate": {
    "id": 1,
    "name": "Vishal Vishwakarma",
    "skills": [
      "Node.js",
      "Express.js",
      "PostgreSQL"
    ],
    "years_of_experience": "1.60",
    "location": "Bilaspur",
    "expected_salary": 1200000
  }
}
```

---

# 2. Create Job

```http
POST /jobs
```

### Request Body

```json
{
  "title": "Backend Developer",
  "requiredSkills": [
    {
      "name": "Node.js",
      "type": "must-have"
    },
    {
      "name": "Express.js",
      "type": "must-have"
    },
    {
      "name": "PostgreSQL",
      "type": "nice-to-have"
    },
    {
      "name": "Docker",
      "type": "nice-to-have"
    }
  ],
  "minYearsExperience": 2,
  "location": "Bilaspur",
  "salaryMin": 900000,
  "salaryMax": 1400000,
  "remoteAllowed": false
}
```

### Example Response

```json
{
  "message": "Job created successfully",
  "job": {
    "id": 1,
    "title": "Backend Developer",
    "required_skills": [
      {
        "name": "Node.js",
        "type": "must-have"
      },
      {
        "name": "Express.js",
        "type": "must-have"
      },
      {
        "name": "PostgreSQL",
        "type": "nice-to-have"
      },
      {
        "name": "Docker",
        "type": "nice-to-have"
      }
    ],
    "min_years_experience": "2.00",
    "location": "Bilaspur",
    "salary_min": 900000,
    "salary_max": 1400000,
    "remote_allowed": false
  }
}
```

---

# 3. Get Job Recommendations

```http
GET /candidates/:candidateId/recommendations
```

Example:

```http
GET /candidates/1/recommendations
```

By default, the API returns the top 5 recommendations.

## Top-N Recommendations

The number of recommendations can be controlled using the `limit` query parameter:

```http
GET /candidates/1/recommendations?limit=2
```

Example response:

```json
{
  "candidateId": 1,
  "count": 2,
  "recommendations": [
    {
      "job": {
        "id": 1,
        "title": "Backend Developer"
      },
      "eligible": true,
      "score": 83.5,
      "breakdown": {
        "skills": "37.5/50",
        "experience": "16/20",
        "location": "15/15",
        "salary": "15/15"
      },
      "matchedSkills": [
        "Node.js",
        "Express.js",
        "PostgreSQL"
      ]
    }
  ]
}
```

---

## 4. Get Candidates Ranked for a Job

```http
GET /jobs/:jobId/recommendations
```

This endpoint returns candidates ranked for the specified job. It uses the same overall scoring system as candidate-to-job recommendations, returns candidates sorted by score in descending order, supports the optional `limit` query parameter, and excludes candidates who are missing any must-have skill.

It returns:

* `404` when the job does not exist
* `400` for an invalid job ID or invalid limit

Example:

```http
GET /jobs/1/recommendations?limit=5
```

Example response:

```json
{
  "jobId": 1,
  "count": 2,
  "recommendations": [
    {
      "candidate": {
        "id": 1,
        "name": "Vishal Vishwakarma",
        "skills": [
          "Node.js",
          "Express.js",
          "PostgreSQL"
        ],
        "years_of_experience": "1.60",
        "location": "Bilaspur",
        "expected_salary": 1200000
      },
      "eligible": true,
      "score": 83.5,
      "breakdown": {
        "skills": "37.5/50",
        "experience": "16/20",
        "location": "15/15",
        "salary": "15/15"
      },
      "matchedSkills": [
        "Node.js",
        "Express.js",
        "PostgreSQL"
      ]
    }
  ]
}
```

---

# Recommendation Scoring

The recommendation score is calculated out of **100 points**.

| Factor     |  Weight |
| ---------- | ------: |
| Skills     |      50 |
| Experience |      20 |
| Location   |      15 |
| Salary     |      15 |
| **Total**  | **100** |

The weights were chosen based on the assumption that **technical skill compatibility is the strongest indicator of whether a candidate can perform the job**.

Must-have skills are also treated as a hard requirement and are therefore handled before the weighted score is calculated.

---

# 1. Skill Score — 50 Points

Skills have the highest weight because the candidate's ability to perform the technical responsibilities of the job is the primary consideration.

Each required skill contributes equally to the skill score.

### Must-Have Skills

If the candidate is missing **any must-have skill**, the job is immediately filtered out.

For example:

```text
Job requires:
Node.js     → must-have
Express.js  → must-have
PostgreSQL  → nice-to-have
Docker      → nice-to-have
```

Candidate:

```text
Node.js
PostgreSQL
```

The candidate is missing `Express.js`, which is a must-have skill.

Therefore:

```text
Eligible = false
Score = 0
```

The job does not appear in the recommendation results regardless of its experience, location, or salary score.

### Nice-to-Have Skills

Nice-to-have skills do not filter out a candidate.

They only contribute to the skill score when matched.

### Formula

```text
Skill Score =
(matched required skills / total required skills) × 50
```

For example:

```text
Required skills = 4
Matched skills = 3

Skill Score = (3 / 4) × 50
            = 37.5
```

---

# 2. Experience Score — 20 Points

Experience is scored independently from the eligibility check.

A candidate who has less experience than the job requirement is **not automatically rejected**.

This allows candidates to still receive recommendations for roles where they are slightly below the requested experience level.

### If candidate meets or exceeds the requirement

```text
Experience Score = 20/20
```

### If candidate has less experience

A proportional score is calculated:

```text
Experience Score =
(candidate experience / required experience) × 20
```

For example:

```text
Candidate experience = 1.6 years
Required experience = 2 years

Score = (1.6 / 2) × 20
      = 16/20
```

### Why this approach?

Experience requirements are often not absolute barriers.

A candidate with 1.6 years of experience may still be capable of performing a role asking for 2 years, especially when their skills match strongly.

Therefore, experience below the minimum reduces the ranking score rather than completely removing the job.

---

# 3. Location Score — 15 Points

Location is scored using the following priority:

### Exact location match

```text
15/15
```

Example:

```text
Candidate: Bilaspur
Job:       Bilaspur
```

### Different location but remote work is allowed

```text
10/15
```

### Different location and remote work is not allowed

```text
0/15
```

### Why?

An exact location match is generally preferable because it avoids relocation or remote-work constraints.

However, a remote job can still be highly relevant even when the candidate and company are in different locations.

---

# 4. Salary Score — 15 Points

Salary compatibility is scored based on the relationship between the candidate's expected salary and the job's salary range.

### Expected salary falls inside the job range

```text
15/15
```

Example:

```text
Expected salary = ₹12 LPA
Job range       = ₹9 LPA - ₹14 LPA
```

The expectation is within the offered range, so:

```text
Salary Score = 15/15
```

### Job offers more than the candidate expects

If the minimum salary offered by the job is already greater than the candidate's expectation:

```text
Salary Score = 15/15
```

Example:

```text
Expected salary = ₹12 LPA
Job range       = ₹15 LPA - ₹18 LPA
```

This is considered a strong salary match.

### Job maximum is below candidate expectation

When the job cannot fully meet the candidate's expected salary, a proportional score is calculated using the maximum salary offered.

```text
Salary Score =
(job maximum salary / expected salary) × 15
```

The result is capped at 15.

Example:

```text
Expected salary = ₹12 LPA
Job maximum     = ₹10 LPA

Score = (10 / 12) × 15
      = 12.5/15
```

### Why?

This provides a gradual penalty instead of treating every salary mismatch as equally bad.

A job offering ₹11.5 LPA to a candidate expecting ₹12 LPA should generally rank higher than a job offering ₹7 LPA.

---

# Overall Score

For an eligible job:

```text
Overall Score =
Skill Score
+ Experience Score
+ Location Score
+ Salary Score
```

Maximum:

```text
50 + 20 + 15 + 15 = 100
```

The jobs are then:

1. Filtered using the must-have skill requirement
2. Scored using the four scoring components
3. Sorted by overall score in descending order
4. Limited according to the requested `limit`

---

# Example Scoring

Candidate:

```text
Skills:
Node.js
Express.js
PostgreSQL

Experience:
1.6 years

Location:
Bilaspur

Expected Salary:
₹12 LPA
```

Job:

```text
Required Skills:
Node.js       → must-have
Express.js    → must-have
PostgreSQL    → nice-to-have
Docker        → nice-to-have

Minimum Experience:
2 years

Location:
Bilaspur

Salary:
₹9 LPA - ₹14 LPA
```

### Skill

```text
3 matched out of 4

(3 / 4) × 50 = 37.5
```

### Experience

```text
(1.6 / 2) × 20 = 16
```

### Location

```text
Exact match = 15
```

### Salary

```text
₹12 LPA is inside ₹9-14 LPA

Score = 15
```

### Final Score

```text
37.5 + 16 + 15 + 15 = 83.5/100
```

Therefore:

```text
Overall Score = 83.5
```

---

# Hard Filtering

Must-have skills are treated differently from other scoring factors.

A job will **never appear** in the recommendation list if the candidate is missing even one must-have skill.

Example:

```text
Job:
Go          → must-have
PostgreSQL  → nice-to-have
```

Candidate:

```text
Node.js
Express.js
PostgreSQL
```

The candidate does not have Go.

Therefore:

```text
Eligible = false
```

The job is removed before ranking.

This prevents a candidate from receiving a high recommendation score for a job where they are missing a critical requirement.

---

# Validation

The API validates incoming candidate and job data before inserting it into the database.

Candidate validation includes:

* Name must be provided
* Skills must be a non-empty array of strings
* Years of experience must be a non-negative number
* Location must be provided
* Expected salary must be a non-negative number

Job validation includes:

* Title must be provided
* Required skills must be provided
* Each skill must contain a valid name and type
* Skill type must be either `must-have` or `nice-to-have`
* Minimum experience must be non-negative
* Location must be provided
* Salary values must be non-negative
* Maximum salary cannot be lower than minimum salary
* `remoteAllowed` must be boolean

Recommendation endpoint validation includes:

* Candidate ID must be a positive integer
* `limit` must be a positive integer

---

# Database Design

PostgreSQL is used as the persistence layer.

The system contains two main tables.

## Candidates

```text
candidates
├── id
├── name
├── skills
├── years_of_experience
├── location
├── expected_salary
└── created_at
```

## Jobs

```text
jobs
├── id
├── title
├── required_skills
├── min_years_experience
├── location
├── salary_min
├── salary_max
├── remote_allowed
└── created_at
```

Skills are stored as PostgreSQL `JSONB` because they are naturally represented as lists and the required skill type (`must-have` / `nice-to-have`) needs to be stored along with each skill.

Example:

```json
[
  {
    "name": "Node.js",
    "type": "must-have"
  },
  {
    "name": "Docker",
    "type": "nice-to-have"
  }
]
```

---

# Testing

The scoring logic has unit tests covering important scenarios and edge cases.

Run:

```bash
npm test
```

The tests cover:

* Normal recommendation scoring
* Missing must-have skill
* Partial salary match
* Salary above candidate expectation
* Experience below required experience
* Experience penalty calculation

Expected output:

```text
✅ scoreJob test passed
✅ must-have skill filter test passed
✅ partial salary match test passed
✅ salary above expectation test passed
✅ experience penalty test passed
```

---

# Error Handling

The API returns appropriate HTTP status codes for common errors.

Examples:

### Invalid candidate ID

```http
GET /candidates/abc/recommendations
```

Response:

```json
{
  "message": "Candidate ID must be a positive integer"
}
```

### Candidate not found

```http
GET /candidates/9999/recommendations
```

Response:

```json
{
  "message": "Candidate not found"
}
```

### Invalid limit

```http
GET /candidates/1/recommendations?limit=abc
```

Response:

```json
{
  "message": "Limit must be a positive integer"
}
```

---

# Assumptions

The following assumptions were made while implementing the recommendation engine:

1. Skill matching is case-insensitive.
2. Each required skill contributes equally to the skill score.
3. Must-have skills are hard requirements.
4. Nice-to-have skills improve the ranking but do not affect eligibility.
5. Experience below the minimum reduces the score proportionally rather than filtering the job.
6. Experience equal to or greater than the requirement receives the full experience score.
7. Exact location matches receive the highest location score.
8. Remote jobs receive a partial location score when the candidate and job locations differ.
9. Salary values are represented as annual salary in INR.
10. A salary expectation inside the job's range is considered a full salary match.
11. Jobs offering more than the candidate's expectation receive the full salary score.
12. When the maximum offered salary is below the candidate's expectation, the salary score decreases proportionally.
13. The system is intentionally rule-based and does not use machine learning.
14. Authentication and authorization are outside the scope of this assignment.

---

# Future Improvements

Possible improvements for a production version include:

* Configurable scoring weights
* Better skill normalization and aliases

  * Example: `Node`, `Node.js`, and `NodeJS`
* More sophisticated salary scoring
* Skill importance weighting
* PostgreSQL indexes for larger datasets
* Pagination for large job datasets
* Caching frequently requested recommendations
* API integration tests
* Recommendation explanation improvements
* Job filtering by additional attributes such as employment type and industry
* Machine-learning-based ranking after sufficient historical recommendation data is available

---

# AI Usage

AI tools were used during development as a development assistant for:

* Discussing API architecture
* Reviewing implementation approaches
* Exploring scoring strategies
* Identifying edge cases
* Improving validation logic
* Generating and reviewing test scenarios
* Reviewing documentation structure

The recommendation scoring approach was reviewed and adapted manually based on the assignment requirements.

The final implementation, scoring weights, formulas, assumptions, and validation behavior were reviewed and understood before being included in the project.

---

# Out of Scope

The following were intentionally not implemented because they were outside the assignment scope:

* Authentication
* Authorization
* User login
* Frontend/UI
* Collaborative filtering
* Machine learning recommendation models
* Complex recruiter workflows

---

# API Summary

| Method | Endpoint                                   | Description                             |
| ------ | ------------------------------------------ | --------------------------------------- |
| GET    | `/health`                                  | Health check                            |
| POST   | `/candidates`                              | Create candidate                        |
| POST   | `/jobs`                                    | Create job                              |
| GET    | `/candidates/:candidateId/recommendations` | Get ranked job recommendations          |
| GET    | `/jobs/:jobId/recommendations`             | Get ranked candidates for a job         |

---

# Example Workflow

A typical flow is:

```text
1. Create candidate
       ↓
2. Create jobs
       ↓
3. Request recommendations
       ↓
4. Check must-have skills
       ↓
5. Calculate skill score
       ↓
6. Calculate experience score
       ↓
7. Calculate location score
       ↓
8. Calculate salary score
       ↓
9. Calculate overall score
       ↓
10. Sort jobs by score
       ↓
11. Return top-N jobs
```

---

# Running the Project

Quick start:

```bash
git clone <repository-url>
cd job-recommendation-engine
npm install
```

Create the PostgreSQL database:

```bash
createdb job_recommendation_engine
```

Run the migration:

```bash
psql -U postgres -d job_recommendation_engine -f src/db/migrations/001_create_tables.sql
```

Configure `.env` and start:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

The API is then available at:

```text
http://localhost:3000
```

---

# Author

**Vishal Vishwakarma**

BTech Graduate
Software Developer

Primary interests:

* Node.js
* Backend Development
* REST APIs
* PostgreSQL
* System Design
* Data Structures & Algorithms


