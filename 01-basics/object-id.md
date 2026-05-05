# MongoDB ObjectId vs Auto-Increment (_id)

## 1. What is ObjectId in MongoDB?

In MongoDB, every document must have a unique field called `_id`.

By default, MongoDB generates this automatically using **ObjectId**.

### Structure of ObjectId (12 bytes)

| Part       | Bytes | Description                         |
| ---------- | ----- | ----------------------------------- |
| Timestamp  | 4     | Creation time (seconds since epoch) |
| Machine ID | 5     | Unique to machine + process         |
| Counter    | 3     | Incrementing value                  |

### Example

```json
{
  "_id": ObjectId("661e8c1f9c9a4b2f8a123456"),
  "name": "Seema",
  "salary": 50000
}
```

### Key Features

* Globally unique
* Automatically generated
* Sortable by creation time
* No need for centralized counter

---

## 2. Can we change ObjectId to Auto-Increment?

👉 **Short Answer: Yes, but NOT recommended**

MongoDB is designed as a distributed database. Auto-increment creates **bottlenecks** and **race conditions**.

---

## 3. Why MongoDB does NOT use Auto-Increment by default?

| Reason             | Explanation                            |
| ------------------ | -------------------------------------- |
| Scalability        | Auto-increment needs a central counter |
| Concurrency issues | Multiple writes can clash              |
| Performance        | Slower in distributed systems          |

---

## 4. How to Implement Auto-Increment in MongoDB

You can simulate auto-increment using a **counter collection**.

### Step 1: Create Counter Collection

```js
db.counters.insertOne({
  _id: "employeeId",
  seq: 0
})
```

### Step 2: Function to Get Next Sequence

```js
function getNextSequence(name) {
  return db.counters.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { returnDocument: "after" }
  ).seq;
}
```

### Step 3: Insert Document with Auto Increment ID

```js
const id = getNextSequence("employeeId");

db.employee.insertOne({
  _id: id,
  name: "Seema",
  salary: 60000
});
```

---

## 5. Can we Remove ObjectId?

❌ **No, `_id` field is mandatory**

But:

* You can **replace ObjectId with your own value**
* Example: number, string, UUID

```js
db.employee.insertOne({
  _id: 101,
  name: "Seema"
})
```

---

## 6. Best Practice (Important for Interviews)

| Use Case                 | Recommended ID                    |
| ------------------------ | --------------------------------- |
| General apps             | ObjectId ✅                        |
| Distributed systems      | ObjectId ✅                        |
| Legacy SQL migration     | Auto-increment (only if required) |
| Human-readable ID needed | Custom string ID                  |

---

## 7. Interview Summary

* ObjectId is default unique identifier in MongoDB
* Auto-increment is possible but not native
* `_id` field is mandatory
* ObjectId is preferred for scalability and performance

---

## 8. When SHOULD you use Auto-Increment?

Use only when:

* Migrating from MySQL/PostgreSQL
* Business requires sequential IDs (invoice number etc.)

Avoid when:

* High traffic system
* Distributed architecture

---

## 9. Pro Tip (Showcase Level)

In real-world applications:

* Use **ObjectId as primary key**
* Maintain **separate readable ID** if needed

```js
{
  _id: ObjectId("..."),
  empId: 1001,
  name: "Seema"
}
```

---

## 10. Conclusion

* ObjectId = scalable, default, efficient
* Auto-increment = controlled, manual, risky at scale

👉 For modern applications: **Always prefer ObjectId**

---

