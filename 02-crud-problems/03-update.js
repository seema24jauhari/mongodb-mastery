// update-problems.js
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Increase salary of one employee by 10%
// $mul multiplies the current value
// 1.1 = 10% increase | 1.05 = 5% increase | 0.9 = 10% decrease
// ─────────────────────────────────────────────
db.employees.updateOne(
  { name: "Shivam" },
  { $mul: { salary: 1.1 } }
);


// ─────────────────────────────────────────────
// Add department = "IT" to ALL employees
// Empty filter {} matches every document
// ─────────────────────────────────────────────
db.employees.updateMany(
  {},
  { $set: { department: "IT" } }
);


// ─────────────────────────────────────────────
// Change role from "Developer" → "Senior Developer"
// ─────────────────────────────────────────────
db.employees.updateMany(
  { role: "Developer" },
  { $set: { role: "Senior Developer" } }
);


// ─────────────────────────────────────────────
// Mark bonus eligible for employees with salary < 10 lakh
// $set adds a new field if it does not exist
// ─────────────────────────────────────────────
db.employees.updateMany(
  { salary: { $lt: 1000000 } },
  { $set: { bonusEligible: true } }
);


// ─────────────────────────────────────────────
// Add new field experience to one employee
// updateOne updates only the first matching document
// Use updateMany to update all matches
// ─────────────────────────────────────────────
db.employees.updateOne(
  { name: "Soham" },
  { $set: { experience: 12 } }
);


// ────────────────────────────────────────────
// Update Edge Cases
// ────────────────────────────────────────────

// Updating non-existing field — $set adds the field if it does not exist
db.employees.updateOne(
  { name: "Ram" },
  { $set: { bonus: 5000 } }
)


// Updating non-existing document — no document matches the filter, so no update occurs
db.employees.updateOne(
  { name: "Sohan" },
  { $set: { salary: 900000 } }
)

// $push adds a value to an array field. If the field does not exist, it creates the field as an array with the new value as its first element.
// $set would replace the entire field, so we use $push to add to the array instead of overwriting it.
db.employees.updateOne(
  { name: "Soham" },
  { $push: { skills: "HTML" } }
)
