// Find employees joined after 2019-01-01
db.employees.find({joinedAt:{$gt:new Date('2019-01-01')}})

// Find employees whose city is either "Delhi" or "Bengaluru"
db.employees.find({'address.city':{$in:['Delhi','Bengaluru']}})

// Find employees whose rating is less than 4 and salary greater than 600000
db.employees.find({rating:{$lt:4}, salary:{$gt:600000}})

// OR

db.employees.find({
  $and: [
    { rating: { $lt: 4 } },
    { salary: { $gt: 600000 } }
  ]
})


// Find employees who are active AND (rating > 4 OR experience > 7)
db.employees.find({$and:[{isActive:true},{$or:[{rating:{$gt:4}},{experience:{$gt:7}}]}]})


// Find employees where experience exists and type is integer
db.employees.find({
  experience: {
    $exists: true,
    $type: "int"
  }
})

// Find employees where joinedAt type is date
db.employees.find({
  joinedAt: {
    $type: "date"
  }
})
