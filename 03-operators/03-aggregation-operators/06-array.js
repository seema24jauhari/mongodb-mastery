
// 06-array.js
// MongoDB Array Operators: $map, $filter, $reduce, $arrayElemAt, $size

// Sample document:
// {
//   name: "Ravi",
//   scores: [70, 80, 90],
//   skills: ["JavaScript", "React", "MongoDB"]
// }

// 1. $map — Transform each array element
db.employees.aggregate([
  {
    $project: {
      name: 1,
      increasedScores: {
        $map: {
          input: "$scores",
          as: "score",
          in: { $add: ["$$score", 5] }
        }
      }
    }
  }
])
// [70, 80, 90] => [75, 85, 95]
// $$score refers to the current array element.

// 2. $filter — Keep elements that match a condition
db.employees.aggregate([
  {
    $project: {
      name: 1,
      highScores: {
        $filter: {
          input: "$scores",
          as: "score",
          cond: { $gte: ["$$score", 80] }
        }
      }
    }
  }
])
// [70, 80, 90] => [80, 90]

// 3. $reduce — Combine array elements into one value
db.employees.aggregate([
  {
    $project: {
      name: 1,
      totalScore: {
        $reduce: {
          input: "$scores",
          initialValue: 0,
          in: { $add: ["$$value", "$$this"] }
        }
      }
    }
  }
])
// [70, 80, 90] => 240
// $$value = accumulated result; $$this = current element.

// 4. $arrayElemAt — Get an element by index
db.employees.aggregate([
  {
    $project: {
      name: 1,
      firstSkill: { $arrayElemAt: ["$skills", 0] },
      lastSkill: { $arrayElemAt: ["$skills", -1] }
    }
  }
])
// Index 0 = first element; index -1 = last element.

// 5. $size — Get the number of array elements
db.employees.aggregate([
  {
    $project: {
      name: 1,
      totalSkills: { $size: "$skills" }
    }
  }
])
// ["JavaScript", "React", "MongoDB"] => 3

// Quick difference:
// $map         -> transform every element
// $filter      -> keep matching elements
// $reduce      -> combine elements into one result
// $arrayElemAt -> get one element by index
// $size        -> count array elements
