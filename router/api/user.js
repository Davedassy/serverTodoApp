const express = require("express");
const {loginUser,logoutUser} = require("../../controller/userController")
const router = express.Router();


router.post("/register",loginUser)

router.post("/login",logoutUser)


module.exports = router
