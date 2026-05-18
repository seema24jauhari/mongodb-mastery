# BSON Types

## What is BSON?

**BSON = Binary JSON**

MongoDB stores data internally in BSON format — not plain JSON.
It is faster, more compact, and supports more data types than standard JSON.

---

## All Common BSON Types

### 1. String
Most common type. Stores text.

```json
{ "name": "Seema" }
```

---

### 2. Integer (32-bit / 64-bit)
Whole numbers.

```json
{ "age": 30 }
```

---

### 3. Double
Floating point numbers.

```json
{ "price": 99.99 }
```

---

### 4. Boolean
`true` or `false` only.

```json
{ "isActive": true }
```

---

### 5. Array
List of values — can be mixed types.

```json
{ "skills": ["MongoDB", "Node.js", "SQL"] }
```

---

### 6. Object (Embedded Document)
A document nested inside another document.

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
Auto-generated unique identifier. Default type for `_id`.

```js
{ "_id": ObjectId("507f1f77bcf86cd799439011") }
```

→ See [object-id.md](./object-id.md) for full breakdown.

---

### 8. Date
Stores date and time.

```js
{ "createdAt": new Date() }
// or a specific date:
{ "createdAt": new Date("2024-01-15") }
```

---

### 9. Null
Represents missing or undefined value.

```json
{ "middleName": null }
```

---

### 10. Binary Data
Used to store files, images, or raw bytes.

```js
{ "profilePhoto": BinData(0, "base64encodeddata") }
```

---

### 11. Decimal128
High-precision decimal numbers. Used for financial data.

```js
{ "amount": NumberDecimal("123.456789") }
```

> ⚠️ Use `Decimal128` instead of `Double` when precision matters (e.g., money, tax).

---

### 12. Regular Expression
Used for pattern matching inside documents.

```js
{ "name": /seema/i }
```

---

### 13. Timestamp
Internal MongoDB type — used for replication logs. Not for general use.

```js
{ "ts": Timestamp(1, 1) }
```

---

## JSON vs BSON

| Feature | JSON | BSON |
|---------|------|------|
| Format | Plain text | Binary |
| Speed | Slower to parse | Faster (binary optimized) |
| Data Types | Limited (string, number, bool, array, object, null) | Extended (Date, ObjectId, Decimal128, BinData etc.) |
| Human Readable | Yes | No (binary) |
| Used In | APIs / transfer | MongoDB internal storage |

---

## Choosing the Right Type

| Data | Recommended BSON Type |
|------|-----------------------|
| Name, title, text | String |
| Age, count | Integer |
| Price (low precision) | Double |
| Price (high precision) | Decimal128 |
| Yes/No flag | Boolean |
| Date of birth, timestamps | Date |
| Unique ID | ObjectId |
| File, image | Binary |
| Tags, list of values | Array |
| Nested address, profile | Object |

---

## Summary

- BSON is MongoDB's internal format — faster and richer than JSON
- Always pick the right type for your data (especially Decimal128 for money)
- ObjectId, Date, and Binary are BSON-only types not available in standard JSON