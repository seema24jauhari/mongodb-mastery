// 02-mixed-problems.js
// Run data/seed.js first before working on these.

use("company");

// =============================================
// 🟡 MEDIUM MIXED PROBLEMS
// =============================================


// Find employees whose salary is between 5-10 lakh
db.employees.find({salary:{$gt:500000, $lt: 1000000}})

// Find employees from IT department sorted by salary descending
db.employees.find({department:'IT'}).sort({salary:-1})

// Find top 3 highest paid 
db.employees.find({}).sort({salary:-1}).limit(3)

// Increase salary by 5% for all Developers
db.employees.updateMany(
  { role: "Developer" },
  { $mul: { salary: 1.05 } }
);

// Rename field role → designation
db.employees.updateMany(
  {},
  { $rename: { role: "designation" } }
);

// Find employees where department exists and salary > 7 lakh 
db.employees.find({salary:{$gt:700000},department:{$exists:true}})

// Remove salary field from Intern employees
db.employees.updateMany({role:'Intern'},{$unset:{salary:""}})

// Add experience = 2 where field does not exist

// Find employees whose role is either Developer OR Tester

// Delete employees whose salary is less than 4 lakh
db.employees.updateMany({experience:{$exists:false}},{$set: {experience:2}})


// Find employees whose role is either MongoDB
db.employees.find({
  skills: "MongoDB"
})


// Find employees whose role is either JavaScript and MongoDB
db.employees.find({
  skills: { $in: ["MongoDB", "React"] }
})

db.employees.find({
  skills: { $all: ["Node", "MongoDB"] }
})