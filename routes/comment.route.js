const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller')
const passport=require('passport')


router.post('/',passport.authuser,commentController.storecomment);
router.get('/:id',commentController.destroy)




module.exports = router;