// insert-problems.js
// INSERT (Create) — Problems 1 to 4
// Run dataset.js first before working on these.

use("company");

// ─────────────────────────────────────────────
// Problem 1 — Insert one employee
// Fields: name, age, role, salary
// ─────────────────────────────────────────────
db.employees.insertOne({
  name: "Ram",
  age: 30,
  role: "Admin",
  salary: 1200000
});


// ─────────────────────────────────────────────
// Problem 2 — Insert 3 employees at once
// ─────────────────────────────────────────────
db.employees.insertMany([
  { name: "Shyam", age: 28, role: "Developer", salary: 800000 },
  { name: "Mohan", age: 32, role: "Tester",    salary: 600000 },
  { name: "Sita",  age: 26, role: "HR",         salary: 500000 }
]);


// ─────────────────────────────────────────────
// Problem 3 — Insert employee with extra field: department
// MongoDB is schema-less — extra fields are always allowed
// ─────────────────────────────────────────────
db.employees.insertOne({
  name: "Geeta",
  age: 29,
  role: "Manager",
  salary: 1000000,
  department: "Software Development"
});


// ─────────────────────────────────────────────
// Problem 4 — Insert employee with missing salary (optional field test)
// Fields are optional by default unless schema validation is applied
// See: create-collection.md for validation setup
// ─────────────────────────────────────────────
db.employees.insertOne({
  name: "Ravi",
  age: 27,
  role: "Intern"
});

// Ordered vs unordered bulk insert
// Ordered Insert — By default, bulk inserts are ordered — if one document fails, the rest are not inserted
db.employees.insertMany([
  { name: "Anil", age: 31, role: "Developer", salary: 900000 },
  { name: "Sunil", age: 29, role: "Tester",    salary: 700000 },
  { name: "Kiran", age: 27, role: "HR" } // Missing salary — will cause error if validation is on
], { ordered: false }); // unordered option allows other valid documents to be inserted even if one fails

//Unordered Insert — If ordered: false is set, MongoDB will attempt to insert all documents, and will report errors for any that fail, but will not stop the entire operation
try {
  db.employees.insertMany(
    [
      { _id: 1, name: "Ram" },
      { _id: 1, name: "Shyam" },
      { _id: 2, name: "Mohan" }
    ],
    { ordered: false }
  );
} catch (e) {
  printjson(e.writeErrors);
}
