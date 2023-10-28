const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Create a new tag (accessible only by admin)
router.post('/', verifyAdmin, tagController.createTag);
// Get all tags
router.get('/', tagController.getAllTags);
// Delete a tag by ID (accessible only by admin)
router.delete('/delete', tagController.dropTag);
router.delete('/:id', verifyAdmin, tagController.deleteTag);


module.exports = router;
