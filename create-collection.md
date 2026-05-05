# MongoDB Create Collection

## 📌 What is a Collection?

A **collection** in MongoDB is similar to a table in SQL. It stores documents (JSON-like data).

---

## 🚀 Create Collection

### 1. Simple Creation

```js
db.createCollection("employee")
```

---

### 2. Auto Creation (Recommended)

MongoDB automatically creates a collection when you insert data:

```js
db.employee.insertOne({
  name: "Seema",
  age: 30,
  salary: 50000
})
```

---

## 🔒 Create Collection with Schema Validation

```js
db.createCollection("employee", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "salary"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string"
        },
        salary: {
          bsonType: "int",
          description: "must be an integer"
        }
      }
    }
  }
})
```

---

## ⚙️ Options While Creating Collection

| Option    | Description             |
| --------- | ----------------------- |
| validator | Apply schema rules      |
| capped    | Fixed-size collection   |
| size      | Max size in bytes       |
| max       | Max number of documents |

---

## 📋 Check Collection

```js
show collections
```

or

```js
db.getCollectionNames()
```

---

## 🧠 Key Notes

* Collections are **schema-less by default**
* `_id` field is automatically added
* Validation is optional but recommended for production

---

## ✅ Example Practice

Create a collection `students` where:

* `name` is required
* `age` is optional
* `marks` must be a number

---
