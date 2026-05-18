
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


// $elemMatch -> match complex condition inside array of objects

// Example structure:
// projects: [
//   { name: "A", hours: 10 },
//   { name: "B", hours: 20 }
// ]

db.employees.find({
  projects: {
    $elemMatch: {
      hours: { $gte: 15 },
      name: "B"
    }
  }
})


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