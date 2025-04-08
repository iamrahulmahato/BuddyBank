const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller')
const passport=require('passport')

// GET /posts/
router.get('/',postController.seepost)


// POST /posts/
router.post('/',passport.authuser,postController.storepost)
router.get('/:id',postController.destroy)



module.exports = router;