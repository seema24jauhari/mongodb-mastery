# 📘 MongoDB Learning Repository

A structured repository to demonstrate practical MongoDB skills — from basics to real-world problem solving.


## 📂 Project Structure

```
mongo-learning/
 ├── 01-basics/          # Core concepts, setup, and simple queries
 ├── 02-crud-problems/   # Real-world CRUD problems with solutions
 ├── 03-aggregation/     # Aggregation pipeline queries
 ├── 04-indexing/        # Indexing and performance concepts
 ├── 05-mini-project/    # Practical project using MongoDB
 └── README.md
```

---

## 🚀 What This Repo Covers

* MongoDB fundamentals (documents, collections, BSON)
* CRUD operations with real use cases
* Aggregation pipelines for data analysis
* Indexing for performance optimization
* Mini project to demonstrate practical implementation

---

## 🎯 Approach

This repository follows a **problem-solving approach** rather than just syntax:

* Each topic includes **real scenarios**
* Queries are written with **clear outputs**
* Focus is on **practical usage**, not just theory

---

## 💡 Goal

To showcase MongoDB knowledge in a way that reflects **real engineering skills**, not just learning notes.

---

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

---
