// ======================================================
// MongoDB $expr - Complete Explanation
// ======================================================

// $expr allows you to use EXPRESSIONS inside a query.
//
// Think:
//
// Normal find() query:
// "Check a field against a fixed value"
//
// $expr query:
// "Calculate/compare values and then decide whether
// the document should be returned"


// ======================================================
// 1. Basic $expr Structure
// ======================================================

db.employees.find({
  $expr: {
    OPERATOR: [
      VALUE_1,
      VALUE_2
    ]
  }
})

// Example:
//
// $gt: [VALUE_1, VALUE_2]
//
// means:
//
// VALUE_1 > VALUE_2


// ======================================================
// 2. "$field" inside $expr
// ======================================================

// "$salary"
// means:
// Get the VALUE of the salary field.
//
// Example document:

{
  name: "Ravi",
  salary: 100000,
  bonus: 15000
}

// "$salary" → 100000
// "$bonus"  → 15000


// ======================================================
// 3. Compare Two Fields
// ======================================================

// Find employees where salary > bonus

db.employees.find({
  $expr: {
    $gt: [
      "$salary",
      "$bonus"
    ]
  }
})

// Read:
//
// salary > bonus


// ======================================================
// 4. Compare Field with Calculated Value
// ======================================================

// Find employees where:
//
// bonus > 10% of salary

db.employees.find({
  $expr: {
    $gt: [
      "$bonus",
      { $multiply: ["$salary", 0.1] }
    ]
  }
})


// Example document:

{
  salary: 100000,
  bonus: 15000
}


// MongoDB calculates from inside to outside:

// Step 1:
// "$salary"
// → 100000


// Step 2:
// $multiply: ["$salary", 0.1]
//
// → 100000 × 0.1
// → 10000


// Step 3:
// "$bonus"
// → 15000


// Step 4:
// $gt: [15000, 10000]
//
// → 15000 > 10000
// → true


// true
// → Employee is returned


// ======================================================
// 5. Example where result is false
// ======================================================

{
  salary: 100000,
  bonus: 5000
}

// Calculate:
//
// salary × 0.1
// → 10000
//
// Compare:
//
// bonus > 10000
//
// 5000 > 10000
// → false
//
// Employee is NOT returned.


// ======================================================
// 6. Compare Array Length
// ======================================================

// Find employees with more than 2 skills

db.employees.find({
  $expr: {
    $gt: [
      { $size: "$skills" },
      2
    ]
  }
})


// Example:

{
  name: "Ravi",
  skills: ["MongoDB", "Node.js", "React"]
}


// Step 1:
//
// $size: "$skills"
// → 3


// Step 2:
//
// $gt: [3, 2]
// → 3 > 2
// → true


// Employee is returned.


// ======================================================
// 7. Why do we need $expr here?
// ======================================================

// Normal $size:
//
// Find exactly 2 skills

db.employees.find({
  skills: { $size: 2 }
})


// But if you want:
//
// skills.length > 2
//
// You need to first calculate:
//
// $size: "$skills"
//
// Then compare:
//
// size > 2
//
// This calculation + comparison needs $expr.


// ======================================================
// 8. Other Comparison Operators
// ======================================================

// $eq  → equal
// $ne  → not equal
// $gt  → greater than
// $gte → greater than or equal
// $lt  → less than
// $lte → less than or equal


// Example:
//
// Find employees where salary >= 500000

db.employees.find({
  $expr: {
    $gte: [
      "$salary",
      500000
    ]
  }
})


// Equivalent simple query:
//
// db.employees.find({
//   salary: { $gte: 500000 }
// })


// For simple comparisons, normal queries are usually easier.
//
// Use $expr when calculation or field-to-field comparison
// is needed.


// ======================================================
// 9. Other Calculation Operators
// ======================================================

// $add       → addition
// $subtract  → subtraction
// $multiply  → multiplication
// $divide    → division


// Example:
//
// Find employees where:
//
// salary + bonus > 1000000

db.employees.find({
  $expr: {
    $gt: [
      {
        $add: [
          "$salary",
          "$bonus"
        ]
      },
      1000000
    ]
  }
})


// MongoDB does:
//
// Step 1:
// salary + bonus
//
// Step 2:
// compare result with 1000000


// ======================================================
// 10. How to Build an $expr Query
// ======================================================

// STEP 1:
// Decide what you want to compare.
//
// Example:
//
// bonus > salary × 10%


// STEP 2:
// Convert both sides into MongoDB values.
//
// Left side:
//
// "$bonus"
//
// Right side:
//
// { $multiply: ["$salary", 0.1] }


// STEP 3:
// Choose comparison operator.
//
// >
//
// becomes:
//
// $gt


// STEP 4:
// Put both values in an array.
//
// $gt: [
//   "$bonus",
//   { $multiply: ["$salary", 0.1] }
// ]


// STEP 5:
// Put it inside $expr.

db.employees.find({
  $expr: {
    $gt: [
      "$bonus",
      { $multiply: ["$salary", 0.1] }
    ]
  }
})


// ======================================================
// IMPORTANT RULES
// ======================================================

// 1. "$field"
//    → Get field value.
//
//    "$salary"
//    → salary value
//
//
// 2. Number/string without $
//    → Direct value.
//
//    100000
//    0.1
//
//
// 3. Calculation operator:
//
//    { $multiply: ["$salary", 0.1] }
//
//    → Calculate salary × 0.1
//
//
// 4. Comparison operator:
//
//    $gt: [VALUE_1, VALUE_2]
//
//    → VALUE_1 > VALUE_2
//
//
// 5. $expr:
//
//    Allows the final expression to be used
//    as a find() condition.
//
//
// ======================================================
// SIMPLE FORMULA
// ======================================================
//
// $expr
//   ↓
// Calculate / get VALUE 1
//   ↓
// Calculate / get VALUE 2
//   ↓
// Compare them
//   ↓
// true  → return document
// false → don't return document
//
//
// ======================================================
// QUICK EXAMPLES
// ======================================================


// salary > bonus

$expr: {
  $gt: ["$salary", "$bonus"]
}


// bonus > salary × 10%

$expr: {
  $gt: [
    "$bonus",
    { $multiply: ["$salary", 0.1] }
  ]
}


// number of skills > 2

$expr: {
  $gt: [
    { $size: "$skills" },
    2
  ]
}


// salary + bonus > 1000000

$expr: {
  $gt: [
    { $add: ["$salary", "$bonus"] },
    1000000
  ]
}


// ======================================================
// FINAL REMEMBER
// ======================================================
//
// Normal Query:
//
// salary: { $gt: 500000 }
//
// → Direct field comparison.
//
//
//
// $expr:
//
// $expr: {
//   $gt: [
//     "$bonus",
//     { $multiply: ["$salary", 0.1] }
//   ]
// }
//
// → Use when you need to:
//
// 1. Compare one field with another field
// 2. Perform calculations
// 3. Compare calculated values
// 4. Use expressions like $size before comparing