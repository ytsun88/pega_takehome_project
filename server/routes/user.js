const router = require("express").Router();
const Users = require("../models").userModel;
const userValidator = require("../validator").userValidator;

router.get("/test", (req, res) => {
  res.json({ Message: "Success" });
});

router.get("/", (req, res) => {
  Users.find({}, "_id username age")
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/add", (req, res) => {
  const { error } = userValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { username, age } = req.body;
  const newUser = new Users({
    username: username,
    age: age,
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

router.put("/edit/:_id", async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { _id } = req.params;
  const { newUsername, newAge } = req.body;
  const foundUser = await Users.findById({ _id });
  if (!foundUser) {
    res.status(404).send("User not found");
  }
  Users.findOneAndUpdate(
    { _id },
    { $set: { username: newUsername, age: newAge } }
  )
    .then(() => {
      res.send("Suceeded");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Update Failed");
    });
});

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
