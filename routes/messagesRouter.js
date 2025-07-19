const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get(
  "/message/new",
  ensureAuthenticated,
  messagesController.newMessageGet
);
router.post(
  "/message/new",
  ensureAuthenticated,
  messagesController.newMessagePost
);
router.post(
  "/message/:id/delete",
  ensureAuthenticated,
  messagesController.deleteMessage
);

module.exports = router;
