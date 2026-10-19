
// 07-accumulator.js
// MongoDB Accumulators: $sum, $avg, $min, $max, $first, $last, $push

// Sample documents:
// { name: "Ravi", department: "IT", salary: 800000 }
// { name: "Amit", department: "IT", salary: 600000 }
// { name: "Neha", department: "HR", salary: 500000 }

// Group employees by department
db.employees.aggregate([
  {
    $group: {
      _id: "$department",

      // 1. $sum — Calculate total salary
      totalSalary: { $sum: "$salary" },

      // 2. $avg — Calculate average salary
      averageSalary: { $avg: "$salary" },

      // 3. $min — Find minimum salary
      minimumSalary: { $min: "$salary" },

      // 4. $max — Find maximum salary
      maximumSalary: { $max: "$salary" },

      // 5. $first — Get the first salary in the group
      firstSalary: { $first: "$salary" },

      // 6. $last — Get the last salary in the group
      lastSalary: { $last: "$salary" },

      // 7. $push — Collect all employee names into an array
      employeeNames: { $push: "$name" }
    }
  }
])

// IMPORTANT:
// $first and $last depend on document order.
// Use $sort before $group when a specific order is required.

// Example: First and last employee by salary
db.employees.aggregate([
  { $sort: { salary: 1 } },
  {
    $group: {
      _id: "$department",
      lowestPaidEmployee: { $first: "$name" },
      highestPaidEmployee: { $last: "$name" }
    }
  }
])

// $sum: 1 counts documents in each group
db.employees.aggregate([
  {
    $group: {
      _id: "$department",
      employeeCount: { $sum: 1 }
    }
  }
])

// Quick difference:
// $sum   -> total or count
// $avg   -> average
// $min   -> smallest value
// $max   -> largest value
// $first -> first value in group order
// $last  -> last value in group order
// $push  -> collect values into an array
