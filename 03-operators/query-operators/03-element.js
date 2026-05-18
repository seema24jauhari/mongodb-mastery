/**
 * MongoDB Element Operators
 * $exists -> checks if field exists
 * $type   -> checks BSON data type
 */

use("company");

// 1. $exists (field exists or not)

// Find employees where "phone" field exists
db.employees.find({ phone: { $exists: true } })

// Find employees where "phone" field does NOT exist
db.employees.find({ phone: { $exists: false } })


// 2. $type (check field data type)

// Find employees where salary is a number
db.employees.find({ salary: { $type: "number" } })

// Find employees where age is an integer
db.employees.find({ age: { $type: "int" } })

// Find employees where email is a string
db.employees.find({ email: { $type: "string" } })

// Find employees where skills is an array
db.employees.find({ skills: { $type: "array" } })

// Find employees where skills is an array of size 3
db.employees.find({ skills: { $size: 3 } })


// Alternative numeric type usage
// $type
// 1 -> double 
// 2 -> string 
// 3 -> object 
// 4 -> array 
// 16 -> int 
// 18 -> long

db.employees.find({ salary: { $type: 1 } })   // double
db.employees.find({ age: { $type: 16 } })     // int
