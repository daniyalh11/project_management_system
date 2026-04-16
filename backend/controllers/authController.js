 const jwt = require("jsonwebtoken");
const { createUser, checkUser } = require("../user");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    await createUser(username, password);

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await checkUser(username, password);

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ ADD THIS HERE
exports.logout = (req, res) => {
  res.json({ message: "Logged out" });
};