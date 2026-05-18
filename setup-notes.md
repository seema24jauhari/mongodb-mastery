# MongoDB Setup Notes (Windows)

## Environment

* OS: Windows 10/11
* Database: MongoDB
* Shell: MongoDB Shell (mongosh)

---

## Installation Steps

1. Download MongoDB Community Server
2. Run Installer → Choose **Complete Setup**
3. Enable **Install MongoDB as a Service**
4. Install Compass (optional)

---

## Verify Installation

```bash
mongosh
```

---

## Common Errors & Fixes

### 1. Error: `'mongosh' is not recognized`

**Reason:** Path not set

**Fix:**

* Go to:

  ```
  C:\Program Files\MongoDB\Server\<version>\bin
  ```
* Copy path
* Add to **Environment Variables → Path**

---

### 2. Error: `'mongod' is not recognized`

**Reason:** MongoDB server binary not in PATH

**Fix:**

1. Locate folder:

   ```
   C:\Program Files\MongoDB\Server\<version>\bin
   ```

2. Check file exists:

   ```
   mongod.exe
   ```

3. Add this folder to **Environment Variables → Path**

4. Restart terminal and verify:

```bash
mongod --version
```

---

### 3. Error: Cannot connect (Connection refused)

**Reason:** MongoDB service not running

**Fix:**

* Open:

  ```
  services.msc
  ```
* Start **MongoDB Server**

---

### 4. Error: Data directory not found

**Fix:**

```bash
mkdir C:\data\db
```

---

### 5. Error: Port 27017 already in use

**Fix:**

* Stop existing MongoDB instance
* OR change port in config

---

## Basic Commands

```js
use mydb
db.createCollection("users")
db.users.insertOne({ name: "Seema", age: 30 })
db.users.find()
```

---

## Learnings

* `mongod` → database server
* `mongosh` → client shell
* PATH setup is critical in Windows
* MongoDB runs on default port **27017**

---

## Status

✔ Installation done
✔ PATH configured
✔ mongod & mongosh working
✔ CRUD operations verified

---
