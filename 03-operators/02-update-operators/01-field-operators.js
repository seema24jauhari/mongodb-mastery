/**
 * MongoDB Update Field Operators
 * $set         -> add/update field value
 * $unset       -> remove field
 * $rename      -> rename field
 * $setOnInsert -> set field only during insert
 */

use("company");

// $set (add/update field)
db.employees.updateOne(
  { name: "Ram" },
  { 
    $set: {
      salary: 1500000, 
      department: "Management"
    }
  }
)
//$currentDate creates the updatedAt field with the current date if it doesn't exist, or updates its value if it already exists.

// $unset (remove field)
db.employees.updateOne(
  { name: "Shyam" },
  {
    $unset: {
      rating: ""
    }
  }
)

// $rename (rename existing field)
db.employees.updateOne(
  { name: "Mohan" },
  {
    $rename: {
      role: "designation"
    }
  }
) 

// $setOnInsert (works only with upsert),
db.employees.updateOne(
  { name: "Karan" }, 
  {
    $set: { 
      age: 25 
    },
    $setOnInsert: {
      createdAt: new Date()
    }  
  },
  {   
    upsert: true
  }    
)
/*
We can use `insertOne()` to set `createdAt` when inserting a document.
But `$setOnInsert` is useful when we use `updateOne()` or `updateMany()` with `upsert: true` because we don't know whether the document already exists.

- If it exists: update the age, but preserve `createdAt`.
- If it doesn't exist: insert the document and initialize `createdAt`.

So, `$setOnInsert` avoids needing separate insert and update queries when you want both behaviors in one operation.

That's exactly the purpose of this query. You use one query to handle both situations.

### Case 1: Karan already exists

```
{ name: "Karan", age: 30, createdAt: "old date" }
```

After the update:

```
{ name: "Karan", age: 25, createdAt: "old date" }
```

Only `age` changes. `createdAt` stays unchanged.

### Case 2: Karan doesn't exist

MongoDB inserts:

```
{ name: "Karan", age: 25, createdAt: new Date() }
```

### Your question: Why use `$setOnInsert` in an update?

Because `updateOne()` with `upsert: true` handles both cases:

- Existing document → update it.
- Missing document → insert it.

If you know the document already exists and only want to update it, you don't need `$setOnInsert` or `upsert: true`. Just use `$set`.
*/
 

// Update nested field
db.employees.updateOne( 
  { name: "Geeta" },
  {
    $set: {
      "address.city": "Noida"
    }
  }
)


// Update multiple documents
db.employees.updateMany(
  { department: "IT" },
  {
    $set: {
      isActive: true
    }
  }
)