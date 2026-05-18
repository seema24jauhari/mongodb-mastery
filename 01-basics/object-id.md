# MongoDB ObjectId vs Auto-Increment

## 1. What is ObjectId?

Every MongoDB document must have a unique `_id` field.
By default, MongoDB generates this automatically using **ObjectId**.

### Structure of ObjectId (12 bytes total)

| Part | Bytes | Description |
|------|-------|-------------|
| Timestamp | 4 | Seconds since Unix epoch (creation time) |
| Machine ID | 5 | Unique to the machine + process |
| Counter | 3 | Incrementing random value |

### Example

```js
{
  "_id": ObjectId("661e8c1f9c9a4b2f8a123456"),
  "name": "Seema",
  "salary": 50000
}
```

### Key Features

- Globally unique across machines
- Auto-generated — no manual work
- Sortable by creation time (first 4 bytes = timestamp)
- No central counter needed

---

## 2. Extract Info from ObjectId

```js
// Get the ObjectId as a string
ObjectId("661e8c1f9c9a4b2f8a123456").toString()

// Get creation timestamp from ObjectId
ObjectId("661e8c1f9c9a4b2f8a123456").getTimestamp()
// Output: ISODate("2024-04-16T...")
```

> 💡 You don't need a `createdAt` field — ObjectId already has the timestamp built in.

---

## 3. Can We Use Auto-Increment Instead?

**Short Answer: Yes, but not recommended.**

MongoDB is designed as a distributed database. Auto-increment requires a central counter which creates bottlenecks and race conditions.

### Why MongoDB Does NOT Use Auto-Increment by Default

| Reason | Explanation |
|--------|-------------|
| Scalability | Auto-increment needs one central counter |
| Concurrency | Multiple simultaneous writes can clash |
| Performance | Slower in distributed/sharded systems |

---

## 4. How to Implement Auto-Increment (if needed)

Simulate it using a **counters collection**.

### Step 1: Create a counter

```js
db.counters.insertOne({
  _id: "employeeId",
  seq: 0
})
```

### Step 2: Function to get next value

```js
function getNextSequence(name) {
  return db.counters.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { returnDocument: "after" }
  ).seq
}
```

### Step 3: Insert with auto-increment ID

```js
const id = getNextSequence("employeeId")

db.employees.insertOne({
  _id: id,
  name: "Seema",
  salary: 60000
})
```

---

## 5. Can We Remove ObjectId?

❌ **The `_id` field is mandatory — it cannot be removed.**

But you can replace ObjectId with your own value:

```js
// Use a custom number as _id
db.employees.insertOne({ _id: 101, name: "Seema" })

// Use a custom string as _id
db.employees.insertOne({ _id: "EMP001", name: "Raj" })
```

---

## 6. Best Practice

| Use Case | Recommended _id |
|----------|----------------|
| General applications | ObjectId ✅ |
| Distributed / sharded systems | ObjectId ✅ |
| Migrating from SQL | Auto-increment (only if required) |
| Human-readable ID needed | Custom string (`"EMP001"`) |
| Financial / invoice number | Auto-increment with counter collection |

---

## 7. Real-World Pattern (Pro Level)

Keep ObjectId as primary key but add a separate readable ID field:

```js
{
  _id: ObjectId("..."),     // internal primary key
  empId: 1001,              // human-readable ID
  name: "Seema",
  salary: 60000
}
```

This gives you both scalability and readability.

---

## 8. When to Use Auto-Increment

✅ Use when:
- Migrating from MySQL / PostgreSQL
- Business requirement for sequential IDs (invoice numbers, order IDs)

❌ Avoid when:
- High traffic system
- Distributed or sharded architecture

---

## 9. Interview Summary

| Question | Answer |
|----------|--------|
| What is `_id`? | Mandatory unique identifier for every document |
| What is ObjectId? | Default auto-generated 12-byte unique ID |
| Is auto-increment supported natively? | No — must be simulated manually |
| Can you use custom `_id`? | Yes — number, string, UUID all work |
| Why prefer ObjectId? | Scalable, distributed-safe, has timestamp built in |

---

## 10. Conclusion

- **ObjectId** = scalable, distributed-safe, efficient, has timestamp
- **Auto-increment** = readable, sequential, risky at scale
- For modern applications: **always prefer ObjectId**