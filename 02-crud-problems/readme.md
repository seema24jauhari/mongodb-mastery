# 02 - CRUD Problems

Practice problems on a real `employees` collection.

---

## 📂 Files

| File | Problems | Topic |
|------|----------|-------|
| `data/seed.js` | — | Sample data to insert first |
| `01-insert.js` | 1–4 | insertOne, insertMany |
| `02-read.js` | 5–13 | find, sort, limit, skip, exists |
| `03-update.js` | 14–18 | updateOne, updateMany, $set, $mul |
| `04-delete.js` | 19–21 | deleteOne, deleteMany |
| `excersice` | 22–27 | Combined real-world queries |

---

## 🚀 How to Use

1. Run `dataset.js` first to seed the data
2. Open any problem file and run queries in mongosh or Compass
3. Unsolved problems are marked with `// your solution here`

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