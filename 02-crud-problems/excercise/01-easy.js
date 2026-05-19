// 01-mixed-problems.js
// Run data/seed.js first before working on these.

use("company");

// =============================================
// 🟢 EASY MIXED PROBLEMS
// =============================================

// Find all employees
db.employees.find({});

// Find all employees from IT department
db.employees.find({ department: "IT" });

// Find employees whose salary is greater than 8 lakh
db.employees.find({ salary: { $gt: 800000 } });

// Sort employees by age descending
db.employees.find({}).sort({ age: -1 });

// Find employees where experience field exists
db.employees.find({ experience: { $exists: true } });

// salary by 10% for employee "Ram"
db.employees.updateOne(
  { name: "Ram" },
  { $mul: { salary: 1.10 } }
);


// Add field bonusEligible = true to all employees
db.employees.updateMany(
  {},
  { $set: { bonusEligible: true } }
);


// Remove department field from employee "Ravi"
db.employees.updateOne(
  { name: "Ravi" },
  { $unset: { department: "" } }
);

// Delete employees whose role is "Intern"
db.employees.deleteMany({ role: "Intern" });

// Count employees in IT department
db.employees.countDocuments({ department: "IT" });

// Find only 2 employese
db.employees.find({}).limit(2)

// Total employees
db.employees.countDocuments();

// Count employees with salary > 10 lakh
db.employees.countDocuments({ salary: { $gt: 1000000 } });