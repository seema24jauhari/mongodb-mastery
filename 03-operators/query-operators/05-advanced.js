/**
 * MongoDB Advanced / Special Operators
 * $regex -> pattern matching
 * $expr  -> aggregation expressions in find
 * $mod   -> modulo condition
 * $text  -> full-text search
 * $where -> JavaScript expression (deprecated, slow)
 */

// Example collection: employees


// 1. $regex -> pattern matching (like LIKE in SQL)

// Find names starting with "A"
db.employees.find({
  name: { $regex: "^A" }
})

// Find emails ending with gmail.com
db.employees.find({
  email: { $regex: "gmail\\.com$" }
})

// Case-insensitive search
db.employees.find({
  name: { $regex: "john", $options: "i" }
})



// 2. $expr -> use aggregation expressions inside find

// Find employees where bonus > 10% of salary
db.employees.find({
  $expr: {
    $gt: ["$bonus", { $multiply: ["$salary", 0.1] }]
  }
})



// 3. $mod -> modulo operation

// Find even salaries
db.employees.find({
  salary: { $mod: [2, 0] }
})

// Find odd ages
db.employees.find({
  age: { $mod: [2, 1] }
})



// 4. $text -> full text search (requires text index)

// First create index:
// db.employees.createIndex({ name: "text", role: "text" })

db.employees.find({
  $text: { $search: "developer node" }
})



