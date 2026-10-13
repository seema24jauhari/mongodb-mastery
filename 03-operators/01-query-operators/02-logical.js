
/**
 * MongoDB Logical Operators
 * $and  -> all conditions must be true
 * $or   -> any one condition must be true
 * $not  -> negates a condition
 * $nor  -> none of the conditions should be true
 */

use("company");

// 1. $and (ALL conditions must match)
db.employees.find({
  $and: [
    { age: { $gte: 25 } },
    { salary: { $gte: 50000 } }
  ]
})


// 2. $or (ANY condition can match)
db.employees.find({
  $or: [
    { department: "IT" },
    { department: "HR" }
  ]
})


// 3. $not (negates a condition)
db.employees.find({
  age: { $not: { $gte: 30 } }
})
// means: age < 30 OR age is missing


// 4. $nor (NONE of the conditions should match)
db.employees.find({
  $nor: [
    { department: "IT" },
    { salary: { $gte: 100000 } }
  ]
})


// Combined example (real interview style)
db.employees.find({
  $and: [
    { department: "IT" },
    {
      $or: [
        { experience: { $gte: 5 } },
        { role: "Tech Lead" }
      ]
    }
  ]
})