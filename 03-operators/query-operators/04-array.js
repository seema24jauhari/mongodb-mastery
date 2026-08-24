
/**
 * MongoDB Array Operators
 * $all        -> match all values in array
 * $elemMatch  -> match condition inside array element
 * $size       -> size of array
 */

// Example collection: employees
// Sample field: skills: ["MongoDB", "Node", "React"]


// $all -> array must contain ALL values
db.employees.find({
  skills: { $all: ["MongoDB", "Node"] }
})

// $elemMatch is used when you have an ARRAY OF OBJECTS
// and multiple conditions must match the SAME array element.


// ------------------------------------------------------
// Example data
// ------------------------------------------------------

const data1 = {
  name: "Ravi",
  projects: [
    { name: "B", hours: 10 },
    { name: "A", hours: 20 }
  ]
}


// ------------------------------------------------------
// What do we want?
// ------------------------------------------------------

// Find employees who have a project where:
//
// name = "B"
// AND
// hours >= 15
//
// IMPORTANT:
// Both conditions must belong to the SAME project object.


// ------------------------------------------------------
// WITHOUT $elemMatch
// ------------------------------------------------------

db.employees.find({
  $and: [
    { "projects.name": "B" },
    { "projects.hours": { $gte: 15 } }
  ]
})


// This CAN return Ravi.
//
// Why?
//
// Condition 1:
// "projects.name": "B"
// → true because the FIRST project has name "B"
//
// Condition 2:
// "projects.hours": { $gte: 15 }
// → true because the SECOND project has hours 20
//
// So MongoDB sees:
//
// true AND true
// → true
//
// IMPORTANT:
// The two conditions can be satisfied by DIFFERENT
// elements of the array.
//
// It is still AND, NOT OR.
//
// The problem is that $and does NOT require the
// conditions to come from the same array element.


// ------------------------------------------------------
// WITH $elemMatch
// ------------------------------------------------------

db.employees.find({
  projects: {
    $elemMatch: {
      name: "B",
      hours: { $gte: 15 }
    }
  }
})


// Now MongoDB checks each project as a complete object.
//
// Project 1:
// { name: "B", hours: 10 }
//
// name = "B"       → true
// hours >= 15      → false
//
// Result → false
//
//
// Project 2:
// { name: "A", hours: 20 }
//
// name = "B"       → false
// hours >= 15      → true
//
// Result → false
//
//
// No single project satisfies BOTH conditions.
//
// Therefore:
//
// Ravi is NOT returned.


// ------------------------------------------------------
// If the data was this:
// ------------------------------------------------------

const data  = {
  name: "Ravi",
  projects: [
    { name: "B", hours: 20 },
    { name: "A", hours: 10 }
  ]
}


// Then:
//
// { name: "B", hours: 20 }
//
// name = "B"       → true
// hours >= 15      → true
//
// SAME object satisfies both conditions.
//
// Therefore Ravi IS returned.


// ------------------------------------------------------
// IMPORTANT: $elemMatch does NOT return the object
// ------------------------------------------------------

// It only checks whether a matching array element EXISTS.
//
// It does NOT return:
//
// { name: "B", hours: 20 }
//
// It returns the WHOLE EMPLOYEE DOCUMENT.
//
// Example:
//
// {
//   name: "Ravi",
//   projects: [
//     { name: "B", hours: 20 },
//     { name: "A", hours: 10 }
//   ]
// }


// ------------------------------------------------------
// Why is $elemMatch needed?
// ------------------------------------------------------

// Because normal array field matching can satisfy
// different conditions using different array elements.
//
// Example:
//
// projects: [
//   { name: "B", hours: 10 },
//   { name: "A", hours: 20 }
// ]
//
// $and:
//
// Condition 1 → first object
// Condition 2 → second object
//
// Both conditions are TRUE,
// so $and can match.
//
// But $elemMatch:
//
// Condition 1 + Condition 2
//        ↓
// MUST be in the SAME object
//
// Therefore it does NOT match.


// ======================================================
// SIMPLE RULE TO REMEMBER
// ======================================================
//
// $and
// → ALL conditions must be true
// → but they can be satisfied by DIFFERENT array elements
//
// $elemMatch
// → ALL conditions must be true
// → and they MUST be satisfied by the SAME array element
//
//
// $elemMatch = "Find ONE array element where ALL
//               these conditions are satisfied."


// ======================================================
// When to use
// ======================================================

// Use $elemMatch when:
//
// 1. You have an array of OBJECTS
// 2. You have MULTIPLE conditions
// 3. Those conditions must match the SAME object
//
// Example:
//
// projects: [
//   { name: "API", hours: 30, status: "active" },
//   { name: "Website", hours: 10, status: "completed" }
// ]
//
// Find an employee with an ACTIVE project
// having at least 25 hours:

db.employees.find({
  projects: {
    $elemMatch: {
      status: "active",
      hours: { $gte: 25 }
    }
  }
})


// ======================================================
// QUICK COMPARISON
// ======================================================
//
// Array:
//
// [
//   { name: "B", hours: 10 },
//   { name: "A", hours: 20 }
// ]
//
//
// $and:
//
// "name is B"        → first object  → true
// "hours >= 15"      → second object → true
//
// true AND true → TRUE
//
//
//
// $elemMatch:
//
// First object  → B + 10 → FAIL
// Second object → A + 20 → FAIL
//
// No single object satisfies both → FALSE
//
//
// ======================================================
// FINAL RULE
// ======================================================
//
// $and:
// ALL conditions must be true.
//
// $elemMatch:
// ALL conditions must be true
// AND
// they must be true on the SAME array element.


// $size -> match exact array length
db.employees.find({
  skills: { $size: 3 }
})


// Simple array value match (most common)
db.employees.find({
  skills: "MongoDB"
})


// $in -> match any value in array
db.employees.find({
  skills: { $in: ["MongoDB", "Python"] }
})


// Check non-empty array
db.employees.find({
  "skills.0": { $exists: true }
})

// Find employees where skills is an array of size 3
db.employees.find({ skills: { $size: 3 } })