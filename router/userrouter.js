const express = require("express");
const router = express.Router();
const {
    registeruser, loginuser
} = require("../controllers/usercontroller")

router.route("/").post(registeruser)
router.route("/login").post(loginuser)

module.exports = router;