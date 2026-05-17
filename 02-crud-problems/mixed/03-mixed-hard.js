// 01-mixed-problems.js
// Run data/seed.js first before working on these.

use("company");

// =============================================
// 🔴 HARD MIXED PROBLEMS
// =============================================

// Find second highest paid employee
db.employees.find({}).sort({salary:-1}).skip(1).limit(1)

// Find employees whose salary is above average salary

// Find employees whose salary is above average salary
const avgSalary = db.employees.aggregate([
  {
    $group: {
      _id: null,
      averageSalary: { $avg: "$salary" }
    }
  }
]).toArray()[0].averageSalary;

db.employees.find({
  salary: { $gt: avgSalary }
});


//    Increase salary by 10% only for employees:
//   - in IT department
//   - salary less than 10 lakh
//   - role is Developer

db.employees.updateMany(
  {
    department: "IT",
    salary: { $lt: 1000000 },
    role: "Developer"
  },
  {
    $mul: { salary: 1.10 }
  }
)


// Find duplicate employee names