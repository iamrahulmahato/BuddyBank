const Post = require("../models/Post");
const Comment = require("../models/Comment");

function storecomment(req, res) {
  console.log(req.user)
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("error in finding");
    }
    console.log(post);

    if (post) {
      Comment.create(
        {
          content: req.body.text,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("error in adding");
          }
          post.comment.push(comment);
          post.save();
          console.log("working");
          res.redirect('back');
        }
      );
    }
  });
}

function destroy(req, res) {
  const commentId = req.params.id;
  Comment.findByIdAndDelete(commentId, function (err, doc) {
    if (err) {
      console.error("error in deleting comment: ", commentId);
    }
    res.redirect('back');
  })
}



module.exports = {
  destroy,
  storecomment,
};
