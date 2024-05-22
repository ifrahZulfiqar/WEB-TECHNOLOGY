let express = require("express");
let router = express.Router();
let User = require("../models/User");
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.redirect("login");
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("login");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.password !== req.body.password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Set session user
  req.session.user = user;

  // Redirect or send success response
  res.status(200).json({ message: 'Login successful', user });
});
module.exports = router;