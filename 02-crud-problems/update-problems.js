// update-problems.js
// UPDATE — Problems 14 to 18
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Problem 14 — Increase salary of one employee by 10%
// $mul multiplies the current value
// 1.1 = 10% increase | 1.05 = 5% increase | 0.9 = 10% decrease
// ─────────────────────────────────────────────
db.employees.updateOne(
  { name: "Shivansh" },
  { $mul: { salary: 1.1 } }
);


// ─────────────────────────────────────────────
// Problem 15 — Add department = "IT" to ALL employees
// Empty filter {} matches every document
// ─────────────────────────────────────────────
db.employees.updateMany(
  {},
  { $set: { department: "IT" } }
);


// ─────────────────────────────────────────────
// Problem 16 — Change role from "Developer" → "Senior Developer"
// ─────────────────────────────────────────────
db.employees.updateMany(
  { role: "Developer" },
  { $set: { role: "Senior Developer" } }
);


// ─────────────────────────────────────────────
// Problem 17 — Mark bonus eligible for employees with salary < 10 lakh
// $set adds a new field if it does not exist
// ─────────────────────────────────────────────
db.employees.updateMany(
  { salary: { $lt: 1000000 } },
  { $set: { bonusEligible: true } }
);


// ─────────────────────────────────────────────
// Problem 18 — Add new field experience to one employee
// updateOne updates only the first matching document
// Use updateMany to update all matches
// ─────────────────────────────────────────────
db.employees.updateOne(
  { name: "Sonam" },
  { $set: { experience: 12 } }
);