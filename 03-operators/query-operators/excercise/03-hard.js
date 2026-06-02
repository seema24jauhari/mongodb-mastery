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


// Find employees where at least one skill contains "Boot"
db.employees.find({
  'skills': {$regex:/boot/i}
})


// Find employees whose skills array size is greater than or equal to 3 and are active
db.employees.find({
  $and: [{
    $expr: {
      $gte: [{
        $size: '$skills'
      },
      3]
    }
  }, {isActive: true}]
})


// Find employees where skills contain both "JavaScript" and "MongoDB" and rating is above 4
db.employees.find({
  $and: [
    {
      skills: {
        $all: ["JavaScript", "MongoDB"]
      }
    },
    {
      rating: { $gt: 4 }
    }
  ]
})

// Find employees where skills contain "Communication" but department is not "HR"
db.employees.find({
  skills: "Communication",
  department: {
    $ne: "HR"
  }
})


// Find employees whose skills include "MongoDB" and joined before 2018
db.employees.find({
  skills:{$in:["MongoDB"]},
  joinedAt: {
    $lt: new Date("2018-01-01")
  }
})

// Find employees where yearly salary (salary * 12) exceeds 10000000
db.employees.find({
  $expr:{
    $gt:[
      {$multiply:['$salary',12]},
      100000
    ]
  }
})