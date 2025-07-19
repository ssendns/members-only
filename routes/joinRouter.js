const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/join", usersController.joinGet);
router.post("/join", usersController.joinPost);

module.exports = router;
