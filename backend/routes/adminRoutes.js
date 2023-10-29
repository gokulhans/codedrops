const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/admins', verifyAdmin, adminController.getAllAdmins);
router.get('/users', verifyAdmin, adminController.getAllUsers);
router.delete('/user/:id', verifyAdmin, adminController.deleteUserById);
router.delete('/admin/:id', verifyAdmin, adminController.deleteAdminById);
router.delete('/tags', verifyAdmin, adminController.dropTag);
router.delete('/users', verifyAdmin, adminController.dropUser);
router.delete('/admins', verifyAdmin, adminController.dropAdmin);
router.delete('/drops', verifyAdmin, adminController.dropDrop);

module.exports = router;
