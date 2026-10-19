
// 05-date.js
// MongoDB Date Operators: $year, $month, $dayOfWeek, $dateToString

// Sample document:
// { name: "Ravi", joiningDate: ISODate("2024-03-15T10:30:00Z") }

// 1. $year — Extract year
db.employees.aggregate([
  {
    $project: {
      name: 1,
      year: { $year: "$joiningDate" }
    }
  }
])

// 2. $month — Extract month (1 = January, 12 = December)
db.employees.aggregate([
  {
    $project: {
      name: 1,
      month: { $month: "$joiningDate" }
    }
  }
])

// 3. $dayOfWeek — Extract day of week
// 1 = Sunday, 2 = Monday, ..., 7 = Saturday
db.employees.aggregate([
  {
    $project: {
      name: 1,
      dayOfWeek: { $dayOfWeek: "$joiningDate" }
    }
  }
])

// 4. $dateToString — Format a date as a string
db.employees.aggregate([
  {
    $project: {
      name: 1,
      formattedDate: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$joiningDate"
        }
      }
    }
  }
])

// Example format: "%d-%m-%Y" => "15-03-2024"
// %Y = year, %m = month, %d = day
// %H = hour, %M = minute, %S = second
// Note: Date operators use the date's UTC representation by default.
// Use timezone: "Asia/Kolkata" when you need Indian local time.
