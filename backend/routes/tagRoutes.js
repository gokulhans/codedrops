const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.post('/', verifyAdmin, tagController.createTag);
router.get('/', tagController.getAllTags);
router.delete('/:id', tagController.deleteTag);


module.exports = router;
