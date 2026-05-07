// mixed-problems.js
// MIXED (Real Thinking) — Problems 22 to 27
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Problem 22 — Get total document count
// ─────────────────────────────────────────────

// Total employees
db.employees.countDocuments();

// Count employees with salary > 10 lakh
db.employees.countDocuments({ salary: { $gt: 1000000 } });


// ─────────────────────────────────────────────
// Problem 23 — Find employees where salary exists, sort ascending, limit 3
// ─────────────────────────────────────────────
db.employees.find({ salary: { $exists: true } })
  .sort({ salary: 1 })
  .limit(3);


// ─────────────────────────────────────────────
// Problem 24 — Increase salary by 5% for all employees in "IT"
// ─────────────────────────────────────────────
db.employees.updateMany(
  { department: "IT" },
  { $mul: { salary: 1.05 } }
);


// ─────────────────────────────────────────────
// Problem 25 — Remove the department field from all employees
// $unset removes a field entirely from the document
// The value "" is a placeholder — MongoDB ignores it
// ─────────────────────────────────────────────
db.employees.updateMany(
  {},
  { $unset: { department: "" } }
);


// ─────────────────────────────────────────────
// Problem 26 — Find employees where department field exists
// ─────────────────────────────────────────────
db.employees.find({ department: { $exists: true } });


// ─────────────────────────────────────────────
// Problem 27 — Rename field role → designation
// $rename updates the field name across all matched documents
// ─────────────────────────────────────────────
db.employees.updateMany(
  {},
  { $rename: { role: "designation" } }
);