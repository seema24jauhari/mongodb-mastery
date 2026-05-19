// Find employees whose joinedAt is between 2016 and 2020
db.employees.find({
  joinedAt: {
    $gte: new Date("2016-01-01"),
    $lte: new Date("2020-12-31")
  }
})

// Find employees whose experience is in [0, 2, 4, 8]
db.employees.find({experience:{$in:[0,2,4,8]}})

// Find employees who are in "IT" department but neither Intern nor Tester
db.employees.find({$and:[{department:'IT'},{role:{$nin:['Intern','Tester']}}]})


// Find employees where address.state exists and type is string
db.employees.find({
  "address.state": {
    $exists: true,
    $type: "string"
  }
})
