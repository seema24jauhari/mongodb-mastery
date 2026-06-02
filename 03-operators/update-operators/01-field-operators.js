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

// $setOnInsert (works only with upsert)
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