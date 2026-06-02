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