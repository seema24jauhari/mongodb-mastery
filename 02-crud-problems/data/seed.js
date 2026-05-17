// dataset.js
// Run this FIRST to seed your local MongoDB before solving any problems.

use("company");

db.employees.drop(); // clear existing data if any

db.employees.insertMany([
  { name: "Ram",      age: 30, role: "Admin",     salary: 1200000, department: "HR" },
  { name: "Shyam",   age: 28, role: "Developer",  salary: 800000,  department: "IT" },
  { name: "Mohan",   age: 32, role: "Tester",     salary: 600000,  department: "IT" },
  { name: "Sita",    age: 26, role: "HR",          salary: 500000,  department: "HR" },
  { name: "Geeta",   age: 29, role: "Manager",    salary: 1000000, department: "IT" },
  { name: "Ravi",    age: 27, role: "Intern",     salary: 300000,  department: "IT" },
  { name: "Sonam",   age: 35, role: "Developer",  salary: 950000,  department: "IT", experience: 10, skills: ["JavaScript", "MongoDB"]   },
  { name: "Mohan",age: 31, role: "Developer",  salary: 750000,  department: "IT" }
]);

console.log("✅ Dataset inserted. Ready to solve problems.");