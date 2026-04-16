const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const { createProject, getProjects } = require("../controllers/projectController");

router.get("/", auth, getProjects);
router.post("/create", auth, role("admin"), createProject);

module.exports = router;