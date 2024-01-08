const router = require("express").Router();
const Users = require("../models").userModel;
const userValidator = require("../validator").userValidator;

// get all existing users
router.get("/", (req, res) => {
  Users.find({}, "_id username age thumbnail")
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// add a new user
router.post("/add", (req, res) => {
  const { username, age, thumbnail } = req.body;
  const { error } = userValidator({ username: username, age: age });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newUser = new Users({
    username: username,
    age: age,
    thumbnail: thumbnail,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update a user's information
router.put("/edit/:_id", async (req, res) => {
  const { username, age, thumbnail } = req.body;
  const { error } = userValidator({ username: username, age: age });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { _id } = req.params;

  const foundUser = await Users.findById({ _id });
  if (!foundUser) {
    res.status(404).send("User not found");
  }
  Users.findOneAndUpdate({ _id }, { $set: { username, age, thumbnail } })
    .then(() => {
      res.send("Succeeded");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Update Failed");
    });
});

// delete a user
router.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  const foundUser = await Users.findById({ _id });
  if (!foundUser) {
    res.status(404).send("User not found");
  }
  Users.deleteOne({ _id: _id })
    .then(() => {
      res.send("Succeeded");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;
