
# MongoDB – Notes

## Core Terms

### Document

* A single record in MongoDB
* Stored in **JSON-like format**
* Example:

```json
{
  "name": "Seema",
  "age": 30
}
```

---

### Collection

* A group of documents
* Similar to a table in SQL
* Example: `users`, `orders`

---

### BSON

* Stands for **Binary JSON**
* Internal format used by MongoDB to store data
* Faster and supports more data types than JSON

---

### Database

* A container for collections
* Example: `myAppDB`

---

### Field

* A key-value pair inside a document
* Example: `"name": "Seema"`

---

### _id

* Unique identifier for each document
* Automatically created by MongoDB

---

### Schema

* Structure of data
* In MongoDB → **flexible (not fixed)**

---

### Index

* Improves query performance
* Similar to index in books (faster search)

---

### Query

* A request to fetch data
* Example:

```js
db.users.find({ age: 30 })
```

---

### Aggregation

* Used for data processing (group, filter, transform)
* Similar to SQL `GROUP BY`

---

### Sharding

* Splitting data across multiple servers
* Helps in **horizontal scaling**

---

### Replication

* Copying data across servers
* Ensures **high availability**

---

### MongoDB Atlas

* Cloud version of MongoDB
* Managed by MongoDB (no setup needed)
* Used for deploying databases online

---

## Quick Summary

* Document → Record
* Collection → Table
* BSON → Storage format
* Atlas → Cloud MongoDB
* Sharding → Scale out
* Replication → Backup & availability

---
