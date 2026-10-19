
// 04-conditional.js
// MongoDB Conditional Operators: $cond, $ifNull, $switch

// Sample document:
// { name: "Ravi", salary: 800000, bonus: 50000, department: "IT" }

// 1. $cond — if/else condition
db.employees.aggregate([
  {
    $project: {
      name: 1,
      salary: 1,
      category: {
        $cond: {
          if: { $gte: ["$salary", 700000] },
          then: "High Salary",
          else: "Regular Salary"
        }
      }
    }
  }
])

// 2. $ifNull — use a fallback if a field is null or missing
db.employees.aggregate([
  {
    $project: {
      name: 1,
      bonus: { $ifNull: ["$bonus", 0] }
    }
  }
])

// 3. $switch — multiple conditions (like switch/case)
db.employees.aggregate([
  {
    $project: {
      name: 1,
      salary: 1,
      category: {
        $switch: {
          branches: [
            {
              case: { $gte: ["$salary", 900000] },
              then: "Very High"
            },
            {
              case: { $gte: ["$salary", 700000] },
              then: "High"
            },
            {
              case: { $gte: ["$salary", 400000] },
              then: "Medium"
            }
          ],
          default: "Low"
        }
      }
    }
  }
])

// Quick difference:
// $cond   -> one condition: if / then / else
// $ifNull -> fallback when value is null or missing
// $switch -> multiple conditions; first matching branch wins
