Perfect—practice is the fastest way.
Here are **CRUD-focused questions on your `employee` collection** 👇

---

## 🟢 Problem: INSERT (Create)

1. Insert one employee with fields: `name`, `age`, `role`, `salary`
2. Insert 3 employees at once with different roles
3. Add an employee with an extra field `department`
4. Insert employee where salary is missing (test optional fields)

---

## 🟢 Answer: INSERT (Create)

### 1. Insert one employee

```js id="p1"
db.employees.insertOne({
  name: "Ram",
  age: 30,
  role: "Admin",
  salary: 120000
})
```

---

### 2. Insert 3 employees at once

```js id="p2"
db.employees.insertMany([
  { name: "Shyam", age: 28, role: "Developer", salary: 80000 },
  { name: "Mohan", age: 32, role: "Tester", salary: 60000 },
  { name: "Sita", age: 26, role: "HR", salary: 50000 }
])
```

---

### 3. Insert with extra field `department`

```js id="p3"
db.employees.insertOne({
  name: "Geeta",
  age: 29,
  role: "Manager",
  salary: 100000,
  department: "Software Development"
})
```

---

### 4. Insert employee without salary (optional field)

```js id="p4"
db.employees.insertOne({
  name: "Ravi",
  age: 27,
  role: "Intern"
})
```

---

## 🔵 Problem: READ (Query)

5. Get all employees
6. Find employees with salary > 10 lakh
7. Find employees with age between 25 and 35
8. Show only name and role (hide `_id`)
9. Find employees whose role is "Developer"
10. Sort employees by salary (descending)
11. Get top 2 highest paid employees


## 🟢 Answer: READ (Query)


---

## 🟡 UPDATE

12. Increase salary of one employee by 10%
13. Add `department = "IT"` to all employees
14. Change role from "Developer" → "Senior Developer"
15. Update multiple employees whose salary < 10 lakh
16. Add new field `experience` to one employee

---

## 🔴 DELETE

17. Delete one employee by name
18. Delete all employees with salary < 8 lakh
19. Delete all documents (be careful 😄)

---

## 🟣 MIXED (Real Thinking)

20. Find employees, sort by salary, limit 3
21. Increase salary by 5% for employees in "IT"
22. Remove `department` field from all employees
23. Find employees where department exists
24. Rename field `role` → `designation`

---

