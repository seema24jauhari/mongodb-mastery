# MongoDB Shell Commands

Basic commands to get started in the MongoDB shell (`mongosh`).

---

## Database Commands

```js
// Show all databases
show dbs

// Create or switch to a database
use myFirstDB

// Check current database
db

// Drop current database
db.dropDatabase()
```

---

## Collection Commands

```js
// Show all collections in current database
show collections

// Create a collection explicitly
db.createCollection("users")

// Drop a collection
db.users.drop()
```

---

## Insert Commands

```js
// Insert one document
db.users.insertOne({
  name: "Seema",
  age: 22,
  city: "Delhi"
})

// Insert multiple documents
db.users.insertMany([
  { name: "Raj", age: 20, city: "Mumbai" },
  { name: "Priya", age: 25, city: "Pune" }
])
```

---

## Find / Read Commands

```js
// Get all documents
db.users.find()

// Get all with readable format
db.users.find().pretty()

// Find by a field
db.users.find({ city: "Delhi" })

// Find one document
db.users.findOne({ name: "Seema" })

// Show only specific fields (projection)
// 1 = show, 0 = hide
db.users.find({}, { name: 1, city: 1, _id: 0 })
```

---

## Update Commands

```js
// Update one document
db.users.updateOne(
  { name: "Seema" },        // filter
  { $set: { age: 23 } }     // what to update
)

// Update multiple documents
db.users.updateMany(
  { city: "Delhi" },
  { $set: { active: true } }
)
```

---

## Delete Commands

```js
// Delete one document
db.users.deleteOne({ name: "Raj" })

// Delete multiple documents
db.users.deleteMany({ active: false })
```

---

## Useful Extras

```js
// Count documents
db.users.countDocuments()
db.users.countDocuments({ city: "Delhi" })

// Sort results (1 = ascending, -1 = descending)
db.users.find().sort({ age: 1 })

// Limit results
db.users.find().limit(3)

// Skip documents (useful for pagination)
db.users.find().skip(2).limit(3)
```

---

## Quick Reference

| Command | Purpose |
|--------|---------|
| `show dbs` | List all databases |
| `use <db>` | Switch/create database |
| `show collections` | List collections |
| `insertOne()` | Add one document |
| `find()` | Read documents |
| `updateOne()` | Update one document |
| `deleteOne()` | Delete one document |
| `countDocuments()` | Count matching docs |