
// ======================================================
// MongoDB Comparison Operators — Expression Context
// ======================================================

// Sample employee:
// { name: "Ravi", salary: 800000, bonus: 100000 }


// 1. $eq — Equal to
// Find employees whose salary equals 800000.

db.employees.find({
  $expr: {
    $eq: ["$salary", 800000]
  }
})

// Meaning: salary === 800000


// 2. $gt — Greater than
// Find employees whose salary is greater than bonus.

db.employees.find({
  $expr: {
    $gt: ["$salary", "$bonus"]
  }
})

// Meaning: salary > bonus


// 3. $lt — Less than
// Find employees whose bonus is less than 20% of salary.

db.employees.find({
  $expr: {
    $lt: [
      "$bonus",
      { $multiply: ["$salary", 0.2] }
    ]
  }
})

// Meaning: bonus < salary * 0.2


// 4. $cmp — Compare two values
// Returns:
// -1 → first value is less than second
//  0 → both values are equal
//  1 → first value is greater than second

db.employees.aggregate([
  {
    $project: {
      name: 1,
      salaryBonusComparison: {
        $cmp: ["$salary", "$bonus"]
      }
    }
  }
])

// Example:
// salary: 800000, bonus: 100000
// Result: salaryBonusComparison: 1

// ======================================================
// Difference: $eq / $gt / $lt vs $cmp
// ======================================================

// $eq → returns true or false
// $gt → returns true or false
// $lt → returns true or false
// $cmp → returns -1, 0, or 1


// ======================================================
// Expression context vs query condition
// ======================================================

// Normal query: compare a field with a fixed value.
db.employees.find({
  salary: { $gt: 500000 }
})

// Expression context: compare field values or calculations.
db.employees.find({
  $expr: {
    $gt: ["$salary", "$bonus"]
  }
})
