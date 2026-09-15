CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    years_of_experience NUMERIC(4, 2) NOT NULL CHECK (years_of_experience >= 0),
    location VARCHAR(100) NOT NULL,
    expected_salary INTEGER NOT NULL CHECK (expected_salary >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    required_skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    min_years_experience NUMERIC(4, 2) NOT NULL CHECK (min_years_experience >= 0),
    location VARCHAR(100) NOT NULL,
    salary_min INTEGER NOT NULL CHECK (salary_min >= 0),
    salary_max INTEGER NOT NULL CHECK (salary_max >= salary_min),
    remote_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);