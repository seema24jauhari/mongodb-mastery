# 03 — MongoDB Query Operators

Practice MongoDB's query operator categories using a shared employee dataset.

---

## Folder Structure

```
03-operators/
├── README.md
├── data/
│   └── seed.js                  # Seed the DB before anything else
│
└── query-operators/
    ├── 01-comparison.js         # $eq $ne $gt $lt $gte $lte $in $nin
    ├── 02-logical.js            # $and $or $not $nor
    ├── 03-element.js            # $exists $type
    ├── 04-array.js              # $all $elemMatch $size
    └── 05-evaluation.js         # $regex $expr $mod $text $where
```

---

## Dataset — `company.employees`

Seed once before solving any file:

```bash
mongosh < data/seed.js
```

Each employee document looks like:

```js
{
  name:       "Soham",
  age:        35,
  role:       "Developer",
  salary:     950000,
  department: "IT",
  experience: 10,
  skills:     ["JavaScript", "MongoDB", "React"],
  address:    { city: "Delhi", state: "Delhi" },
  rating:     4.6,
  isActive:   true,
  joinedAt:   ISODate("2014-07-22")
}
```

---

## Operator Reference

### 01 — Comparison
| Operator | Meaning |
|----------|---------|
| `$eq`  | Equal to |
| `$ne`  | Not equal to |
| `$gt`  | Greater than |
| `$lt`  | Less than |
| `$gte` | Greater than or equal |
| `$lte` | Less than or equal |
| `$in`  | Matches any value in array |
| `$nin` | Matches none of the values in array |

```js
// salary greater than 800000
db.employees.find({ salary: { $gt: 800000 } })

// role is either Developer or Tester
db.employees.find({ role: { $in: ["Developer", "Tester"] } })
```

---

### 02 — Logical
| Operator | Meaning |
|----------|---------|
| `$and` | All conditions must match |
| `$or`  | At least one condition must match |
| `$not` | Negates a condition |
| `$nor` | None of the conditions must match |

```js
// IT department AND salary above 700000
db.employees.find({ $and: [{ department: "IT" }, { salary: { $gt: 700000 } }] })

// not an Intern
db.employees.find({ role: { $not: { $eq: "Intern" } } })
```

---

### 03 — Element
| Operator | Meaning |
|----------|---------|
| `$exists` | Field exists (or does not exist) |
| `$type`   | Field matches a BSON type |

```js
// documents that have an address field
db.employees.find({ address: { $exists: true } })

// salary stored as a number (double = 1)
db.employees.find({ salary: { $type: "double" } })
```

---

### 04 — Array
| Operator | Meaning |
|----------|---------|
| `$all`       | Array contains all specified values |
| `$elemMatch` | At least one element matches all conditions |
| `$size`      | Array has exactly N elements |

```js
// skills contains both JavaScript and MongoDB
db.employees.find({ skills: { $all: ["JavaScript", "MongoDB"] } })

// exactly 2 skills
db.employees.find({ skills: { $size: 2 } })
```

---

### 05 — Evaluation
| Operator | Meaning |
|----------|---------|
| `$regex` | Matches a regular expression |
| `$expr`  | Allows aggregation expressions in queries |
| `$mod`   | Modulo arithmetic on a field |
| `$text`  | Full-text search (requires a text index) |
| `$where` | JavaScript expression (avoid in production) |

```js
// name starts with 'S'
db.employees.find({ name: { $regex: /^S/ } })

// experience is even (mod 2 == 0)
db.employees.find({ experience: { $mod: [2, 0] } })

// salary > experience * 100000
db.employees.find({ $expr: { $gt: ["$salary", { $multiply: ["$experience", 100000] }] } })
```

---

## How to Use

1. **Seed the database**
   ```bash
   mongosh < data/seed.js
   ```

2. **Open a problem file**, read the comment for each problem, then write your query below it.

3. **Run your solution**
   ```bash
   mongosh < query-operators/01-comparison.js
   ```

4. Work through the files in order — each builds on concepts from the previous one.

---

## Tips

- All files target the `company` database and `employees` collection.
- Use `mongosh` (MongoDB Shell) to run `.js` files directly.
- Prefix queries with `use("company")` inside each file so they're self-contained.
- `$text` requires creating a text index first — the relevant file will remind you.
- Avoid `$where` in real projects; it's here only for learning purposes.