const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller')
const passport=require('passport')

router.get('/:id',postController.destroy)


module.exports = router;