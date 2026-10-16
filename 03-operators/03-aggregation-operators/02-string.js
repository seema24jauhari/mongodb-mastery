// ============================================================
// aggregation-operators/02-string.js
// MongoDB Aggregation String Operators
// ============================================================
//
// Operators:
// $concat
// $toUpper
// $substr
// $trim
// $split
//
// ============================================================


// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------

use("company");

db.users.drop();

db.users.insertMany([
  {
    firstName: "john",
    lastName: "doe",
    email: "john.doe@gmail.com",
    username: "  johndoe  ",
    fullName: "John Doe"
  },
  {
    firstName: "sarah",
    lastName: "smith",
    email: "sarah.smith@gmail.com",
    username: "  sarahsmith  ",
    fullName: "Sarah Smith"
  },
  {
    firstName: "mike",
    lastName: "jones",
    email: "mike.jones@gmail.com",
    username: "  mikejones  ",
    fullName: "Mike Jones"
  }
]);


// ============================================================
// $concat
// ============================================================

// Q1. Create the full name by joining firstName and lastName.

db.users.aggregate([
  {
    $project: {
      firstName: 1,
      lastName: 1,
      fullName: {
        $concat: ["$firstName", " ", "$lastName"]
      }
    }
  }
]);


// Q2. Create a welcome message for every user.
//
// Expected:
// "Welcome john!"
// "Welcome sarah!"
// "Welcome mike!"

db.users.aggregate([
  {
    $project: {
      firstName: 1,
      message: {
        $concat: ["Welcome ", "$firstName", "!"]
      }
    }
  }
]);


// Q3. Create an email address using firstName and lastName.
//
// Format:
// firstname.lastname@gmail.com

db.users.aggregate([
  {
    $project: {
      firstName: 1,
      lastName: 1,
      email: {
        $concat: [
          "$firstName",
          ".",
          "$lastName",
          "@gmail.com"
        ]
      }
    }
  }
]);


// ============================================================
// $toUpper
// ============================================================

// Q4. Convert firstName to uppercase.
//
// Expected:
// JOHN
// SARAH
// MIKE

db.users.aggregate([
  {
    $project: {
      firstName: 1,
      upperName: {
        $toUpper: "$firstName"
      }
    }
  }
]);


// Q5. Convert fullName to uppercase.

db.users.aggregate([
  {
    $project: {
      fullName: 1,
      upperFullName: {
        $toUpper: "$fullName"
      }
    }
  }
]);


// Q6. Convert email to uppercase.

db.users.aggregate([
  {
    $project: {
      email: 1,
      upperEmail: {
        $toUpper: "$email"
      }
    }
  }
]);


// ============================================================
// $substr
// ============================================================

// Q7. Get the first 3 characters of firstName.
//
// Example:
// john → joh

db.users.aggregate([
  {
    $project: {
      firstName: 1,
      shortName: {
        $substr: ["$firstName", 0, 3]
      }
    }
  }
]);


// Q8. Get the first 2 characters of lastName.

db.users.aggregate([
  {
    $project: {
      lastName: 1,
      shortLastName: {
        $substr: ["$lastName", 0, 2]
      }
    }
  }
]);


// Q9. Get the first 4 characters of email.

db.users.aggregate([
  {
    $project: {
      email: 1,
      emailPrefix: {
        $substr: ["$email", 0, 4]
      }
    }
  }
]);


// ============================================================
// $trim
// ============================================================

// Q10. Remove leading and trailing spaces from username.
//
// Example:
// "  johndoe  " → "johndoe"

db.users.aggregate([
  {
    $project: {
      username: 1,
      cleanUsername: {
        $trim: {
          input: "$username"
        }
      }
    }
  }
]);


// Q11. Remove leading and trailing spaces from fullName.

db.users.aggregate([
  {
    $project: {
      fullName: 1,
      cleanName: {
        $trim: {
          input: "$fullName"
        }
      }
    }
  }
]);


// ============================================================
// $split
// ============================================================

// Q12. Split fullName into an array using a space.
//
// Example:
// "John Doe" → ["John", "Doe"]

db.users.aggregate([
  {
    $project: {
      fullName: 1,
      nameParts: {
        $split: ["$fullName", " "]
      }
    }
  }
]);


// Q13. Split email into two parts using "@".
//
// Example:
// "john.doe@gmail.com"
// → ["john.doe", "gmail.com"]

db.users.aggregate([
  {
    $project: {
      email: 1,
      emailParts: {
        $split: ["$email", "@"]
      }
    }
  }
]);


// Q14. Split email using ".".
//
// Example:
// "john.doe@gmail.com"
// → ["john", "doe@gmail", "com"]

db.users.aggregate([
  {
    $project: {
      email: 1,
      parts: {
        $split: ["$email", "."]
      }
    }
  }
]);


// ============================================================
// COMBINING OPERATORS
// ============================================================

// Q15. Create an uppercase full name.
//
// Example:
// john + doe → JOHN DOE
//
// Use $concat + $toUpper.

db.users.aggregate([
  {
    $project: {
      name: {
        $toUpper: {
          $concat: [
            "$firstName",
            " ",
            "$lastName"
          ]
        }
      }
    }
  }
]);


// Q16. Create a clean uppercase username.
//
// Example:
// "  johndoe  " → "JOHNDOE"
//
// Use $trim + $toUpper.

db.users.aggregate([
  {
    $project: {
      username: {
        $toUpper: {
          $trim: {
            input: "$username"
          }
        }
      }
    }
  }
]);


// Q17. Create a display name.
//
// Expected:
// "JOHN - DOE"
// "SARAH - SMITH"
// "MIKE - JONES"
//
// Use $concat + $toUpper.

db.users.aggregate([
  {
    $project: {
      displayName: {
        $concat: [
          {
            $toUpper: "$firstName"
          },
          " - ",
          {
            $toUpper: "$lastName"
          }
        ]
      }
    }
  }
]);


// Q18. Create a username.
//
// Expected:
// john_doe
// sarah_smith
// mike_jones

db.users.aggregate([
  {
    $project: {
      username: {
        $concat: [
          "$firstName",
          "_",
          "$lastName"
        ]
      }
    }
  }
]);


// Q19. Get the first 3 characters of uppercase firstName.
//
// Example:
// john → JOH
//
// Use $toUpper + $substr.

db.users.aggregate([
  {
    $project: {
      shortName: {
        $substr: [
          {
            $toUpper: "$firstName"
          },
          0,
          3
        ]
      }
    }
  }
]);


// Q20. Split the email using "@".
//
// Example:
// john.doe@gmail.com
// → ["john.doe", "gmail.com"]

db.users.aggregate([
  {
    $project: {
      emailParts: {
        $split: ["$email", "@"]
      }
    }
  }
]);