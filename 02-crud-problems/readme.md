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
12. Skip results
13. Find employees where salary field exists

## 🟢 Answer: READ (Query)

### 5. Get all employees

```js id="p5"
db.employees.find({})
```

### 6. Find employees with salary > 10 lakh

```js id="p6"
db.employees.find({salary:{$gt:10}})
```

📝 Explanation
- $gt -> means greater than
- $gte -> means greater than equal to
- $lt -> means lesser than
- $lte -> means lesser than equal to

### 7. Find employees with age between 25 and 35

```js id="p7"
db.employees.find({salary:{$gte:30, $lte:35}})
```

### 8. Show only name and role (hide `_id`)

```js id="p8"
db.employees.find({},{name:1, role:1,_id:0})
```

📝 Explanation
-If we don't set _id:0, then query will default return that.

### 9. Find employees whose role is "Developer"

```js id="p9"
db.employees.find({role:'Developer'})

db.employees.find({
  role: { $regex: "^qa$", $options: "i" }
})  
```

📝 Explanation
-Query will return exact match. If your column have value that is "developer" instead of "Developer" then in that case no data will return. To fix that we need to add regex.


### 10. Sort employees by salary (descending)

```js id="p10"
// Sort employees by salary in ascending order (low to high)
db.employees.find().sort({ salary: 1 })
// Sort employees by salary in descending order (high to low)
db.employees.find().sort({ salary: -1 })
// Sort by multiple fields: role ascending, salary descending
db.employees.find().sort({
  role: 1,
  salary: -1
})
```

📝 Explanation
1 → Ascending order
-1 → Descending order
Can sort on multiple fields
---

### 11. Get top 2 highest paid employees

```js id="p11"
// Get first 5 employees
db.employees.find().limit(5)
// Get top 2 highest paid employees
db.employees.find()
  .sort({ salary: -1 })
  .limit(2)
```

📝 Explanation

- limit(n) → restricts number of documents returned
- Often used with sort() for top/bottom results

### 12. Skip results

```js id="p12"
// Skip first 5 employees
db.employees.find().skip(5)
// Pagination: skip 5 and get next 5 employees
db.employees.find()
  .skip(5)
  .limit(5)
// Top 3 highest paid employees after skipping first 2
db.employees.find()
  .sort({ salary: -1 })
  .skip(2)
  .limit(3)

```

### 13. Find employees where salary field exists

```js id="p13"
db.employees.find({ salary: { $exists: true } })
```

📝 Explanation
- skip(n) → skips first n documents
- Commonly used for pagination0
- Combine with limit() for better control





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

