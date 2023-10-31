const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');

// User Signup and Signin
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/google/signin", authController.googleSignIn);

// Admin Signup and Signin
router.post("/admin/signup", authController.signUpAdmin);
router.post("/admin/signin", authController.signInAdmin);

module.exports = router;