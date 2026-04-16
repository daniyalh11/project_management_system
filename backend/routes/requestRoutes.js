const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  requestAccess,
  approveRequest,
  denyRequest,
  getRequests
} = require("../controllers/requestController");

router.post("/request", auth, role("client"), requestAccess);
router.post("/approve", auth, role("admin"), approveRequest);
router.post("/deny", auth, role("admin"), denyRequest);
router.get("/", auth, role("admin"), getRequests);

module.exports = router;