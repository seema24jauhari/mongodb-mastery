// Find employees whose department is either "HR" or "IT"
db.employees.find({ $or: [ 
    { department: 'HR' },
    { department: 'IT' }
]})

// OR

db.employees.find({
  department: { $in: ['HR', 'IT'] }
})


// Find employees whose age is not 30
db.employees.find({age:{$ne: 30}})

// Find active employees from "Delhi"
db.employees.find({isActive:true,'address.city':'Delhi'})

// Find employees who are neither from "Delhi" nor "Mumbai"
db.employees.find({'address.city':{$nin:["Delhi","Mumbai"]}})

// Find employees where isActive field type is boolean
db.employees.find({
  isActive: {
    $type: "bool"
  }
})

// Find employees having skills both "JavaScript" and "Node.js"
db.employees.find({
  skills: {
    $all: ["JavaScript", "Node.js"]
  }
})

   
// Find employees with exactly 1 skills
db.employees.find({
  skills: {
    $size: 1
  }
})


// Find employees whose city contains "del" case insensitive
db.employees.find({
  'address.city':{$regex:/del/i}
})