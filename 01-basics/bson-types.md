# BSON Types Cheatsheet

## What is BSON?

* BSON = **Binary JSON**
* Used internally by MongoDB to store data
* Supports more data types than JSON

---

## Common BSON Types

### 1. String

```json
{ "name": "Seema" }
```

---

### 2. Integer (32-bit / 64-bit)

```json
{ "age": 30 }
```

---

### 3. Double (Floating point)

```json
{ "price": 99.99 }
```

---

### 4. Boolean

```json
{ "isActive": true }
```

---

### 5. Array

```json
{ "skills": ["MongoDB", "Node.js", "SQL"] }
```

---

### 6. Object (Embedded Document)

```json
{
  "address": {
    "city": "Delhi",
    "pincode": 110001
  }
}
```

---

### 7. ObjectId

```js
{ "_id": ObjectId("507f1f77bcf86cd799439011") }
```

* Unique identifier (auto-generated)

---

### 8. Date

```js
{ "createdAt": new Date() }
```

---

### 9. Null

```json
{ "middleName": null }
```

---

### 10. Binary Data

```js
{ "file": BinData(0, "base64data") }
```

---

### 11. Decimal128

```js
{ "amount": NumberDecimal("123.45") }
```

* High precision (financial data)

---

### 12. Regular Expression

```js
{ "name": /Seema/i }
```

---

## JSON vs BSON (Quick View)

| Feature    | JSON    | BSON                  |
| ---------- | ------- | --------------------- |
| Format     | Text    | Binary                |
| Speed      | Slower  | Faster (optimized)    |
| Data Types | Limited | More (Date, ObjectId) |

---

## Quick Summary

* BSON = Extended JSON (binary format)
* Supports rich data types
* Improves performance and flexibility in MongoDB

---
