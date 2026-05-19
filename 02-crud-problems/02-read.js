// read-problems.js
// READ (Query) — Problems 5 to 13
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Get all employees
// ─────────────────────────────────────────────
// This is curson based query — it returns a cursor object which is an iterator over the result set
db.employees.find({});
// To see the actual documents, you can use toArray() or pretty()
db.employees.find({}).toArray();
// Used only for readable formatting. Not recommended for large datasets as it loads everything in memory
db.employees.find({}).pretty();

// Iterating over cursor with forEach (memory efficient for large datasets)
let total = 0

db.employees.find().forEach(emp => {
   if(emp.salary){
      total += Number(emp.salary)
   }
})

print(total)

// ─────────────────────────────────────────────
// Find employees with salary > 10 lakh (1,000,000)
// Operators: $gt > $gte >= $lt < $lte <= $eq == $ne !=
// ─────────────────────────────────────────────
db.employees.find({ salary: { $gt: 1000000 } });


// ─────────────────────────────────────────────
// Find employees with age between 25 and 35 (inclusive)
// ─────────────────────────────────────────────
db.employees.find({ age: { $gte: 25, $lte: 35 } });


// ─────────────────────────────────────────────
// Show only name and role (hide _id)
// Projection: 1 = show, 0 = hide
// _id is shown by default — explicitly set 0 to hide it
// ─────────────────────────────────────────────
db.employees.find({}, { name: 1, role: 1, _id: 0 });



// ─────────────────────────────────────────────
// Find employees whose role is "Developer"
// ─────────────────────────────────────────────

// Exact match (case-sensitive)
db.employees.find({ role: "Developer" });

// Case-insensitive match using regex
db.employees.find({ role: { $regex: "^developer$", $options: "i" } });


// ─────────────────────────────────────────────
// Sort employees by salary
// 1 = Ascending (low to high), -1 = Descending (high to low)
// ─────────────────────────────────────────────

// Ascending
db.employees.find().sort({ salary: 1 });

// Descending
db.employees.find().sort({ salary: -1 });

// Multi-field: role ascending, salary descending
db.employees.find().sort({ role: 1, salary: -1 });


// ─────────────────────────────────────────────
// Get top 2 highest paid employees
// Always combine limit() with sort() for meaningful results
// ─────────────────────────────────────────────
db.employees.find().sort({ salary: -1 }).limit(2);


// ─────────────────────────────────────────────
// Pagination using skip and limit
// skip(n) skips first n documents
// ─────────────────────────────────────────────

// Skip first 5 documents
db.employees.find().skip(5);

// Page 2: skip first 5, get next 5
db.employees.find().skip(5).limit(5);

// Top 3 highest paid, skip first 2
db.employees.find().sort({ salary: -1 }).skip(2).limit(3);


// ─────────────────────────────────────────────
// Find employees where salary field exists (or does not)
// ─────────────────────────────────────────────

// Salary exists
db.employees.find({ salary: { $exists: true } });

// Salary does NOT exist
db.employees.find({ salary: { $exists: false } });


// Find employees whose skills include MongoDB
db.employees.find({
  skills: "MongoDB"
})

// Find employees whose role is either JavaScript and MongoDB
db.employees.find({
  skills: { $in: ["MongoDB", "React"] }
})


db.employees.find({
  "address.city": "Delhi"
})