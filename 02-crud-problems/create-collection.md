# MongoDB Create Collection

## 📌 What is a Collection?

A **collection** in MongoDB is similar to a table in SQL. It stores documents (JSON-like data).

---

## 🚀 Ways to Create a Collection

### 1. Explicit Creation

```js
db.createCollection("employees")
```

### 2. Auto Creation (Recommended)

MongoDB automatically creates a collection when you first insert data — no need to create it manually.

```js
db.employees.insertOne({
  name: "Seema",
  age: 30,
  salary: 50000
})
```

> 💡 In most real projects, auto-creation is preferred. Explicit creation is useful when you need options like validation or capped collections.

---

## 🔒 Create Collection with Schema Validation

Validation enforces rules on what data can be inserted.

```js
db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "salary"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        salary: {
          bsonType: "int",
          description: "must be an integer and is required"
        },
        age: {
          bsonType: "int",
          description: "must be an integer if provided"
        }
      }
    }
  }
})
```

> ⚠️ If you try to insert a document missing `name` or `salary`, MongoDB will reject it.

---

## ⚙️ Collection Options

| Option | Description |
|--------|-------------|
| `validator` | Apply schema validation rules |
| `capped` | Fixed-size collection (oldest docs auto-deleted when full) |
| `size` | Max size in bytes (required if `capped: true`) |
| `max` | Max number of documents allowed |

### Example: Capped Collection

```js
db.createCollection("logs", {
  capped: true,
  size: 1048576,  // 1MB
  max: 1000       // max 1000 documents
})
```

> 💡 Capped collections are useful for logs or activity feeds where you only need recent data.

---

## 📋 Check Existing Collections

```js
// Simple list
show collections

// Returns array of collection names
db.getCollectionNames()
```

---

## 🗑️ Drop a Collection

```js
db.employees.drop()
```

> ⚠️ This permanently deletes the collection and all its documents.

---

## 🧠 Key Notes

- Collections are **schema-less by default** — documents can have different fields
- `_id` field is automatically added to every document
- Schema validation is optional but **recommended for production**
- You cannot rename a collection directly — drop and recreate instead

---

## ✅ Practice Problem

Create a `students` collection with validation where:
- `name` is required and must be a string
- `age` is optional but must be an integer if provided
- `marks` is required and must be a number

<details>
<summary>💡 Solution</summary>

```js
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "marks"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        age: {
          bsonType: "int",
          description: "must be an integer if provided"
        },
        marks: {
          bsonType: "number",
          description: "must be a number and is required"
        }
      }
    }
  }
})
```

</details>