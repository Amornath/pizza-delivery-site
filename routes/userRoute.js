const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newser = new User({ name, email, password });
  try {
    newser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };

      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User Login fail" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallusers", async (req, res) => {
  // const { userid } = req.body;
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });

    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
