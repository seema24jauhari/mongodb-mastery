# MongoDB – README

## What is MongoDB?

MongoDB is a **NoSQL database** that stores data in a flexible, JSON-like format called **documents** (BSON internally).
Instead of tables and rows, it uses **collections** and **documents**.

Think of it like:

* A document = one record (like a JSON object)
* A collection = group of documents (like a table)

It is designed for:

* High performance
* Scalability (easy to scale horizontally)
* Flexible schema (no fixed structure required)

---

## Key Features

* Schema-less (you can store different structures in same collection)
* High scalability (sharding support)
* Fast reads/writes
* JSON-like data (easy for developers)

---

## NoSQL vs SQL (Simple Comparison)

| Feature       | SQL (Relational DB)        | NoSQL (MongoDB)                 |
| ------------- | -------------------------- | ------------------------------- |
| Structure     | Tables, Rows, Columns      | Collections, Documents          |
| Schema        | Fixed (strict)             | Flexible (dynamic)              |
| Data Format   | Structured                 | Semi-structured (JSON-like)     |
| Relationships | Uses JOINs                 | Embedded documents / references |
| Scalability   | Vertical (scale up server) | Horizontal (add more servers)   |
| Example DB    | MySQL, PostgreSQL          | MongoDB                         |

---

## In Simple Words

* **SQL**: Good when data is structured and relationships are complex
* **MongoDB (NoSQL)**: Good when data is flexible and needs to scale fast

---

## When to Use MongoDB?

* Rapid development (changing requirements)
* Large-scale applications
* Real-time analytics
* Applications using JSON APIs

---

## Basic Example

### SQL (Table)

```
id | name | age
1  | John | 25
```

### MongoDB (Document)

```json
{
  "name": "John",
  "age": 25
}
```

---

## Summary

MongoDB is a modern database that gives flexibility and scalability, making it a strong choice for modern web applications, especially when data structure is not fixed.
