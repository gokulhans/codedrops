const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get("/", userController.getAll);

// GET user by ID
router.get("/:id", userController.getById);

// POST a new user
router.post("/", userController.create);

// UPDATE user by ID
router.put("/:id", userController.updateById);

// DELETE user by ID
router.delete("/:id", userController.deleteById);

module.exports = router;
