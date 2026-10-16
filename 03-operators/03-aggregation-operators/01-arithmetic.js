// ============================================================
// aggregation-operators/01-arithmetic.js
// MongoDB Aggregation Arithmetic Operators
// ============================================================
//
// Operators covered:
// $add
// $subtract
// $multiply
// $divide
// $mod
//
// ============================================================


// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

use("company");


// ============================================================
// $add
// ============================================================

// Q1. Find the total income of each employee.
//     Total income = salary + bonus (if bonus field exists)
//
// Expected:
// John  -> 55000
// Sarah -> 68000
// Mike  -> 49000

db.employees.aggregate([
  {
    $project: {
      name: 1,
      totalIncome: {
        $add: ["$salary", "$bonus"] 
      }
    }
  }
]);


// ------------------------------------------------------------

// Q2. Add a fixed allowance of 2000 to every employee's salary.
//
// Formula:
// salary + 2000

db.employees.aggregate([
  {
    $project: {
      name: 1,
      salary: 1,
      salaryWithAllowance: {
        $add: ["$salary", 2000]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q3. Calculate the employee's final income by adding
//     salary + bonus + 2000 allowance.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      finalIncome: {
        $add: ["$salary", "$bonus", 2000]
      }
    }
  }
]);


// ============================================================
// $subtract
// ============================================================

// Q4. Find the salary remaining after tax.
//
// Formula:
// salary - tax

db.employees.aggregate([
  {
    $project: {
      name: 1,
      salaryAfterTax: {
        $subtract: ["$salary", "$tax"]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q5. Find the employee's bonus after deducting 1000.
//
// Formula:
// bonus - 1000

db.employees.aggregate([
  {
    $project: {
      name: 1,
      remainingBonus: {
        $subtract: ["$bonus", 1000]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q6. Find how much more salary an employee earns than
//     their bonus.
//
// Formula:
// salary - bonus

db.employees.aggregate([
  {
    $project: {
      name: 1,
      difference: {
        $subtract: ["$salary", "$bonus"]
      }
    }
  }
]);


// ============================================================
// $multiply
// ============================================================

// Q7. Calculate the annual salary assuming the salary field
//     represents monthly salary.
//
// Formula:
// monthly salary × 12

db.employees.aggregate([
  {
    $project: {
      name: 1,
      annualSalary: {
        $multiply: ["$salary", 12]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q8. Calculate 10% of each employee's salary.
//
// Formula:
// salary × 0.10

db.employees.aggregate([
  {
    $project: {
      name: 1,
      tenPercentSalary: {
        $multiply: ["$salary", 0.10]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q9. Calculate a new salary after a 10% increment.
//
// Formula:
// salary + (salary × 10%)
//
// Hint:
// You need both $add and $multiply.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      newSalary: {
        $add: [
          "$salary",
          {
            $multiply: ["$salary", 0.10]
          }
        ]
      }
    }
  }
]);


// ============================================================
// $divide
// ============================================================

// Q10. Calculate the daily salary assuming there are
//      30 days in a month.
//
// Formula:
// salary / 30

db.employees.aggregate([
  {
    $project: {
      name: 1,
      dailySalary: {
        $divide: ["$salary", 30]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q11. Calculate the weekly salary assuming 4 weeks in a month.
//
// Formula:
// salary / 4

db.employees.aggregate([
  {
    $project: {
      name: 1,
      weeklySalary: {
        $divide: ["$salary", 4]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q12. Calculate the average salary per working day.
//
// Formula:
// salary / workingDays

db.employees.aggregate([
  {
    $project: {
      name: 1,
      salaryPerWorkingDay: {
        $divide: ["$salary", "$workingDays"]
      }
    }
  }
]);


// ============================================================
// $mod
// ============================================================

// Q13. Find the remainder when salary is divided by 1000.
//
// Formula:
// salary % 1000

db.employees.aggregate([
  {
    $project: {
      name: 1,
      remainder: {
        $mod: ["$salary", 1000]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q14. Find the remainder when the employee's working days
//      are divided by 5.
//
// Formula:
// workingDays % 5

db.employees.aggregate([
  {
    $project: {
      name: 1,
      remainder: {
        $mod: ["$workingDays", 5]
      }
    }
  }
]);


// ============================================================
// COMBINING OPERATORS
// ============================================================

// Q15. Calculate final salary:
//
//      salary + bonus - tax
//
// Use $add and $subtract.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      finalSalary: {
        $subtract: [
          {
            $add: ["$salary", "$bonus"]
          },
          "$tax"
        ]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q16. Calculate the final salary after adding a 10% increment
//      and then deducting tax.
//
// Formula:
//
// salary
// + (salary × 10%)
// - tax
//
// Use $add, $multiply and $subtract.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      finalSalary: {
        $subtract: [
          {
            $add: [
              "$salary",
              {
                $multiply: ["$salary", 0.10]
              }
            ]
          },
          "$tax"
        ]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q17. Calculate the monthly salary from annual salary.
//
// First create annual salary:
// salary × 12
//
// Then divide it by 12.
//
// Use $multiply and $divide.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      monthlySalary: {
        $divide: [
          {
            $multiply: ["$salary", 12]
          },
          12
        ]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q18. Calculate the employee's total compensation:
//
// salary + bonus + 10% of salary
//
// Use $add and $multiply.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      totalCompensation: {
        $add: [
          "$salary",
          "$bonus",
          {
            $multiply: ["$salary", 0.10]
          }
        ]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q19. Calculate the amount remaining after:
//
// salary + bonus
// - tax
// - 2000 deduction
//
// Use $add and $subtract.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      remainingAmount: {
        $subtract: [
          {
            $add: ["$salary", "$bonus"]
          },
          {
            $add: ["$tax", 2000]
          }
        ]
      }
    }
  }
]);


// ------------------------------------------------------------

// Q20. Calculate the average daily compensation:
//
// (salary + bonus) / workingDays
//
// Use $add and $divide.

db.employees.aggregate([
  {
    $project: {
      name: 1,
      dailyCompensation: {
        $divide: [
          {
            $add: ["$salary", "$bonus"]
          },
          "$workingDays"
        ]
      }
    }
  }
]);



// Combine all five operators in one arithmetic expression.
db.employees.aggregate([
  {
    $project: {
      name: 1,

      added: {
        $add: ["$salary", "$bonus"]
      },

      subtracted: {
        $subtract: ["$salary", "$tax"]
      },

      multiplied: {
        $multiply: ["$salary", 2]
      },

      divided: {
        $divide: ["$salary", 12]
      },

      remainder: {
        $mod: ["$salary", 12]
      }
    }
  }
]);