/**
 * MongoDB Comparison Operators
 * $eq  -> equal
 * $ne  -> not equal
 * $gt  -> greater than
 * $lt  -> less than
 * $gte -> greater than or equal
 * $lte -> less than or equal
 * $in  -> matches any value in array
 * $nin -> does NOT match any value in array
 */

use("company");

// Find employees with age equal to 30 ($eq is implicit for direct matches)
db.employees.find({ age: { $eq: 30 } }) // age == 30
db.employees.find({ age: { $ne: 30 } }) // age != 30
db.employees.find({ age: { $gt: 30 } }) // age > 30
db.employees.find({ age: { $lt: 30 } }) // age < 30
db.employees.find({ age: { $gte: 30 } }) // age >= 30
db.employees.find({ age: { $lte: 30 } }) // age <= 30


// Find employees with role either "Developer" OR "Tester"
db.employees.find({ department: { $in: ["IT", "HR", "Finance"] } })

// Find employees whose city is NOT Delhi or Mumbai
db.employees.find({ city: { $nin: ["Delhi", "Mumbai"] } })