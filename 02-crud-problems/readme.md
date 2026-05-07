# 02 - CRUD Problems

Practice problems on a real `employees` collection — covering Insert, Read, Update, Delete, and mixed queries.

---

## 📦 Sample Dataset

Before solving, insert this data into your local MongoDB:

```js
use company

db.employees.insertMany([
  { name: "Ram",      age: 30, role: "Admin",     salary: 1200000, department: "HR" },
  { name: "Shyam",   age: 28, role: "Developer",  salary: 800000,  department: "IT" },
  { name: "Mohan",   age: 32, role: "Tester",     salary: 600000,  department: "IT" },
  { name: "Sita",    age: 26, role: "HR",          salary: 500000,  department: "HR" },
  { name: "Geeta",   age: 29, role: "Manager",    salary: 1000000, department: "IT" },
  { name: "Ravi",    age: 27, role: "Intern",     salary: 300000,  department: "IT" },
  { name: "Sonam",   age: 35, role: "Developer",  salary: 950000,  department: "IT", experience: 10 },
  { name: "Shivansh",age: 31, role: "Developer",  salary: 750000,  department: "IT" }
])
```

---

## 🟢 INSERT (Create)

### Problem 1 — Insert one employee with fields: `name`, `age`, `role`, `salary`

```js
db.employees.insertOne({
  name: "Ram",
  age: 30,
  role: "Admin",
  salary: 1200000
})
```

---

### Problem 2 — Insert 3 employees at once with different roles

```js
db.employees.insertMany([
  { name: "Shyam",  age: 28, role: "Developer", salary: 800000 },
  { name: "Mohan",  age: 32, role: "Tester",    salary: 600000 },
  { name: "Sita",   age: 26, role: "HR",         salary: 500000 }
])
```

---

### Problem 3 — Insert an employee with an extra field `department`

```js
db.employees.insertOne({
  name: "Geeta",
  age: 29,
  role: "Manager",
  salary: 1000000,
  department: "Software Development"
})
```

> 💡 MongoDB is schema-less — extra fields are allowed without any configuration.

---

### Problem 4 — Insert employee where salary is missing (test optional fields)

```js
db.employees.insertOne({
  name: "Ravi",
  age: 27,
  role: "Intern"
})
```

> 💡 Fields are optional by default unless you use schema validation. See `create-collection.md`.

---

## 🔵 READ (Query)

### Problem 5 — Get all employees

```js
db.employees.find({})
```

---

### Problem 6 — Find employees with salary > 10 lakh (1,000,000)

```js
db.employees.find({ salary: { $gt: 1000000 } })
```

📝 Comparison operators:
| Operator | Meaning |
|----------|---------|
| `$gt` | Greater than |
| `$gte` | Greater than or equal to |
| `$lt` | Less than |
| `$lte` | Less than or equal to |
| `$eq` | Equal to |
| `$ne` | Not equal to |

---

### Problem 7 — Find employees with age between 25 and 35

```js
db.employees.find({ age: { $gte: 25, $lte: 35 } })
```

---

### Problem 8 — Show only name and role (hide `_id`)

```js
db.employees.find({}, { name: 1, role: 1, _id: 0 })
```

📝 In projection: `1` = show, `0` = hide. `_id` is shown by default — set `_id: 0` to hide it.

---

### Problem 9 — Find employees whose role is "Developer"

```js
// Exact match (case-sensitive)
db.employees.find({ role: "Developer" })

// Case-insensitive match using regex
db.employees.find({
  role: { $regex: "^developer$", $options: "i" }
})
```

📝 Always use `$regex` with `$options: "i"` when you can't guarantee consistent casing in your data.

---

### Problem 10 — Sort employees by salary

```js
// Ascending (low to high)
db.employees.find().sort({ salary: 1 })

// Descending (high to low)
db.employees.find().sort({ salary: -1 })

// Multi-field: role ascending, salary descending
db.employees.find().sort({ role: 1, salary: -1 })
```

📝 `1` = Ascending, `-1` = Descending

---

### Problem 11 — Get top 2 highest paid employees

```js
db.employees.find()
  .sort({ salary: -1 })
  .limit(2)
```

📝 `limit(n)` restricts the number of documents returned. Always combine with `sort()` for meaningful top/bottom results.

---

### Problem 12 — Pagination using skip and limit

```js
// Skip first 5 documents
db.employees.find().skip(5)

// Page 2: skip first 5, get next 5
db.employees.find().skip(5).limit(5)

// Top 3 highest paid, skip first 2
db.employees.find()
  .sort({ salary: -1 })
  .skip(2)
  .limit(3)
```

📝 `skip(n)` skips the first `n` documents. Combine with `limit()` for pagination.

---

### Problem 13 — Find employees where salary field exists

```js
db.employees.find({ salary: { $exists: true } })

// Find employees where salary does NOT exist
db.employees.find({ salary: { $exists: false } })
```

---

## 🟡 UPDATE

### Problem 14 — Increase salary of one employee by 10%

```js
db.employees.updateOne(
  { name: "Shivansh" },
  { $mul: { salary: 1.1 } }
)
```

📝 `$mul` multiplies the current value. `1.1` = 10% increase. `1.05` = 5% increase.

---

### Problem 15 — Add `department = "IT"` to all employees

```js
db.employees.updateMany(
  {},
  { $set: { department: "IT" } }
)
```

---

### Problem 16 — Change role from "Developer" → "Senior Developer"

```js
db.employees.updateMany(
  { role: "Developer" },
  { $set: { role: "Senior Developer" } }
)
```

---

### Problem 17 — Mark bonus eligible for employees with salary < 10 lakh

```js
db.employees.updateMany(
  { salary: { $lt: 1000000 } },
  { $set: { bonusEligible: true } }
)
```

---

### Problem 18 — Add new field `experience` to one employee

```js
db.employees.updateOne(
  { name: "Sonam" },
  { $set: { experience: 12 } }
)
```

📝 `updateOne` updates only the first matching document. Use `updateMany` to update all matches.

---

## 🔴 DELETE

### Problem 19 — Delete one employee by name

```js
db.employees.deleteOne({ name: "Sonam" })
```

---

### Problem 20 — Delete all employees with salary < 8 lakh (800,000)

```js
db.employees.deleteMany({ salary: { $lt: 800000 } })
```

---

### Problem 21 — Delete all documents

```js
db.employees.deleteMany({})
```

> ⚠️ This removes all documents but keeps the collection. Use `db.employees.drop()` to remove the collection entirely.

---

## 🟣 MIXED (Real Thinking)

### Problem 22 — Get total document count

```js
// Total employees
db.employees.countDocuments()

// Count employees with salary > 10 lakh
db.employees.countDocuments({ salary: { $gt: 1000000 } })
```

---

### Problem 23 — Find employees, sort by salary, limit 3

```js
db.employees.find({ salary: { $exists: true } })
  .sort({ salary: 1 })
  .limit(3)
```

---

### Problem 24 — Increase salary by 5% for employees in "IT"

```js
db.employees.updateMany(
  { department: "IT" },
  { $mul: { salary: 1.05 } }
)
```

---

### Problem 25 — Remove `department` field from all employees

```js
// your solution here
```

> 💡 Hint: Look up the `$unset` operator.

---

### Problem 26 — Find employees where department field exists

```js
// your solution here
```

> 💡 Hint: You already used `$exists` in Problem 13.

---

### Problem 27 — Rename field `role` → `designation`

```js
// your solution here
```

> 💡 Hint: Look up the `$rename` operator.

---

## 📌 Operators Quick Reference

| Operator | Type | Use |
|----------|------|-----|
| `$gt`, `$gte`, `$lt`, `$lte` | Comparison | Filter by range |
| `$eq`, `$ne` | Comparison | Match / not match |
| `$exists` | Element | Check if field exists |
| `$set` | Update | Add or update a field |
| `$unset` | Update | Remove a field |
| `$mul` | Update | Multiply a field value |
| `$inc` | Update | Increment a field value |
| `$rename` | Update | Rename a field |
| `$regex` | Query | Pattern matching |