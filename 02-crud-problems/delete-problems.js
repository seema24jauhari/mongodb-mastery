// delete-problems.js
// DELETE — Problems 19 to 21
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Problem 19 — Delete one employee by name
// deleteOne removes only the first matching document
// ─────────────────────────────────────────────
db.employees.deleteOne({ name: "Sonam" });


// ─────────────────────────────────────────────
// Problem 20 — Delete all employees with salary < 8 lakh (800,000)
// ─────────────────────────────────────────────
db.employees.deleteMany({ salary: { $lt: 800000 } });


// ─────────────────────────────────────────────
// Problem 21 — Delete ALL documents (keep the collection)
// deleteMany({}) removes all documents but the collection still exists
// Use db.employees.drop() to remove the collection entirely
// ─────────────────────────────────────────────
db.employees.deleteMany({});