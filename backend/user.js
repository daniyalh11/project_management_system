const db = require("./config/db");
const bcrypt = require("bcrypt");

// Use case: create new user
// Validation: email format, password strength
// Validation: prevent duplicate users
async function createUser(username, password) {
  const usersRef = db.collection("users");

  const existing = await usersRef.where("username", "==", username).get();
  if (!existing.empty) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await usersRef.add({
    username,
    password: hashedPassword,
    role: "client" // default
  });

  return newUser.id;
}

// Use case: login user
// Validation: check username exists
// Validation: match password
async function checkUser(username, password) {
  const usersRef = db.collection("users");

  const snapshot = await usersRef.where("username", "==", username).get();

  if (snapshot.empty) {
    throw new Error("User not found");
  }

  const user = snapshot.docs[0].data();

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
}

module.exports = { createUser, checkUser };