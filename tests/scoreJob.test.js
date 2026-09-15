import { strict as assert } from "node:assert";
import { scoreJob } from "../src/scoring/scoreJob.js";

const candidate = {
  skills: ["Node.js", "Express.js", "PostgreSQL"],
  years_of_experience: "1.60",
  location: "Bilaspur",
  expected_salary: 1200000
};

const job = {
  required_skills: [
    {
      name: "Node.js",
      type: "must-have"
    },
    {
      name: "Express.js",
      type: "must-have"
    },
    {
      name: "PostgreSQL",
      type: "nice-to-have"
    },
    {
      name: "Docker",
      type: "nice-to-have"
    }
  ],
  min_years_experience: "2.00",
  location: "Bilaspur",
  salary_min: 900000,
  salary_max: 1400000,
  remote_allowed: false
};

const result = scoreJob(candidate, job);

assert.equal(result.eligible, true);
assert.equal(result.score, 83.5);
assert.equal(result.breakdown.skills, "37.5/50");
assert.equal(result.breakdown.experience, "16/20");
assert.equal(result.breakdown.location, "15/15");
assert.equal(result.breakdown.salary, "15/15");

console.log("✅ scoreJob test passed");

const candidateMissingMustHave = {
  ...candidate,
  skills: ["Node.js", "PostgreSQL"]
};

const filteredResult = scoreJob(
  candidateMissingMustHave,
  job
);

assert.equal(filteredResult.eligible, false);
assert.equal(filteredResult.score, 0);
assert.deepEqual(
  filteredResult.missingMustHave,
  ["Express.js"]
);

console.log("✅ must-have skill filter test passed");

const salaryBelowExpectationCandidate = {
  ...candidate,
  expected_salary: 1200000
};

const salaryBelowExpectationJob = {
  ...job,
  salary_min: 800000,
  salary_max: 1000000
};

const salaryResult = scoreJob(
  salaryBelowExpectationCandidate,
  salaryBelowExpectationJob
);

assert.equal(salaryResult.breakdown.salary, "12.5/15");

console.log("✅ partial salary match test passed");

const salaryAboveExpectationJob = {
  ...job,
  salary_min: 1500000,
  salary_max: 1800000
};

const highSalaryResult = scoreJob(
  candidate,
  salaryAboveExpectationJob
);

assert.equal(highSalaryResult.breakdown.salary, "15/15");

console.log("✅ salary above expectation test passed");

const lowExperienceCandidate = {
  ...candidate,
  years_of_experience: "1.00"
};

const lowExperienceResult = scoreJob(
  lowExperienceCandidate,
  job
);

assert.equal(lowExperienceResult.eligible, true);
assert.equal(
  lowExperienceResult.breakdown.experience,
  "10/20"
);

console.log("✅ experience penalty test passed");