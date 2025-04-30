const express = require("express");
const protectRoute = require("./../middleware/protectRoute");
const {
  sendMessage,
  getMessage,
} = require("../controllers/message_controller");
const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
