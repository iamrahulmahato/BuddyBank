const express = require('express');
const comment = require('../models/Comment');

const router = express.Router();

console.log('router loaded');

router.use('/posts', require('./posts.route'));

router.use('/comment',require('./comment.route'));

router.use('/destroy',require('./destroy.route'))

module.exports = router;