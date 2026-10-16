/**
 * MongoDB Misc Update Operators
 * $currentDate -> set current date/time
 * $setOnInsert -> set value only during insert
 * $bit         -> perform bitwise operations
 */

use("company");


// $currentDate (adds current date)
db.employees.updateOne(
  { name: "Ram" },
  {
    $currentDate: {
      updatedAt: true
    }
  }
)

/*

The difference is when and how the date field is created or updated.

| Method                                    | Purpose                                                            |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `insertOne({ createdAt: new Date() })`    | Creates a new document with the current date.                      |
| `$set: { createdAt: new Date() }`         | Creates or overwrites the date field in an existing document.      |
| `$currentDate: { createdAt: true }`       | Creates or overwrites the field using MongoDB's current date/time. |
| `$setOnInsert: { createdAt: new Date() }` | Sets the date only when an upsert inserts a new document.          |

Example: If you want to record when an employee was created, use `insertOne()` with `createdAt: new Date()` or use `$setOnInsert` in an upsert so future updates don't change the creation date.

*/


// $currentDate with timestamp type
db.employees.updateOne(
  { name: "Shyam" },
  {
    $currentDate: {
      lastModified: {
        $type: "timestamp"
      }
    }
  }
)

/*
Yes, but there is an important difference.

- BSON Date (`$currentDate: { lastModified: true }`) stores time as milliseconds since the Unix epoch (January 1, 1970).
- BSON Timestamp (`$type: "timestamp"`) stores a seconds component since the Unix epoch plus an increment counter.

Example:

```
// BSON Date
{
  $currentDate: {
    lastModified: true
  }
}

// BSON Timestamp
{
  $currentDate: {
    lastModified: {
      $type: "timestamp"
    }
  }
}
```
Remember: Both relate to epoch time, but BSON Date is the normal choice for application dates. BSON Timestamp is mainly for MongoDB's internal ordering and replication mechanisms.

The increment counter helps distinguish timestamps that have the same seconds value.

A BSON Timestamp contains two parts:

```
Timestamp = seconds + increment
```

Example:

| Timestamp | Seconds | Increment |
| --------- | ------- | --------- |
| A         | 1000    | 1         |
| B         | 1000    | 2         |
| C         | 1000    | 3         |
| D         | 1001    | 0         |

A, B, and C have the same seconds value, but their increment counters differ, so they can be ordered.

Important: The increment is not milliseconds. It's a counter used to distinguish timestamps within the same second. MongoDB BSON Timestamps are commonly used internally for ordering database operations.

*/


// $setOnInsert (works only with upsert)
db.employees.updateOne(
  { name: "Karan" },
  {
    $set: {
      age: 25
    },
    $setOnInsert: {
      createdAt: new Date(),
      isActive: true
    }
  },
  {
    upsert: true
  }
)

/* 

Almost correct.

- First time (Karan doesn't exist): MongoDB inserts a document with `name`, `age: 25`, `createdAt`, and `isActive`.
- Later (Karan exists): `$set` updates `age` to `25`, but `$setOnInsert` does not update `createdAt` or `isActive`.

Remember:

- `$set` → applies to every matching update.
- `$setOnInsert` → applies only when a new document is inserted through `upsert: true`.
*/


// $bit AND 
// This performs bitwise operations on integer fields. In this example, it will perform a bitwise AND with the value 5 on the "permission" field of the document where name is "Ravi".
db.employees.updateOne(
  { name: "Ravi" },
  {
    $bit: {
      permission: {
        and: 5
      }
    }
  }
)


// $bit OR
// This will perform a bitwise OR with the value 2 on the "permission" field of the document where name is "Ravi".
db.employees.updateOne(
  { name: "Ravi" },
  {
    $bit: {
      permission: {
        or: 2
      }
    }
  }
)


// $bit XOR
db.employees.updateOne(
  { name: "Ravi" },
  {
    $bit: {
      permission: {
        xor: 3
      }
    }
  }
)