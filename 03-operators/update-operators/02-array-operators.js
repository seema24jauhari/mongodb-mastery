/**
 * MongoDB Array Update Operators
 * $push     -> add item to array
 * $pull     -> remove matching item from array
 * $pop      -> remove first/last item
 * $addToSet -> add only if value does not exist
 * $each     -> add multiple items
 * $slice    -> limit array size
 */

use("company");


// push (add single item)
db.employees.updateOne(
  { name: "Ram" },
  {
    $push: {
      skills: "Leadership"
    }
  }
)


// $push with $each (add multiple items)
db.employees.updateOne(
  { name: "Shyam" },
  {
    $push: {
      skills: {
        $each: ["MongoDB", "React"]
      }
    }
  }
)


// $addToSet (prevents duplicates)
db.employees.updateOne(
  { name: "Geeta" },
  {
    $addToSet: {
      skills: "MongoDB"
    }
  }
)


// $addToSet with $each
db.employees.updateOne(
  { name: "Geeta" },
  {
    $addToSet: {
      skills: {
        $each: ["Docker", "Kubernetes"]
      }
    }
  }
)


// $pull (remove matching value)
db.employees.updateOne(
  { name: "Mohan" },
  {
    $pull: {
      skills: "Jest"
    }
  }
)


// $pop (remove last element)
db.employees.updateOne(
  { name: "Soham" },
  {
    $pop: {
      skills: 1
    }
  }
)


// $pop (remove first element)
db.employees.updateOne(
  { name: "Soham" },
  {
    $pop: {
      skills: -1
    }
  }
)


// $push with $slice
db.employees.updateOne(
  { name: "Ravi" },
  {
    $push: {
      skills: {
        $each: ["Node.js", "Express", "MongoDB"],
        $slice: -2
      }
    }
  }
)
