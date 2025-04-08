const { populate } = require("../models/Post");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

function seepost(req, res) {
  Post.find({})
    .populate("user").populate('comment')
    .exec(function (err, content) {
      if (content) {
        res.render("content", {
          posts: content,
        });
      }
    });
}
function storepost(req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, user) {
      if (err) {
        console.log("There is some issue in adding in DB ", err);
      }
      console.log("user is added");
      res.redirect("back");
    }
  );
}

function destroy(req,res)
{
  Post.findById(req.params.id,function(err,post)
  {

    if(post.user=req.user.id)
    {
      post.remove()
      Comment.deleteMany({post: req.params.id},function(err){
        return res.redirect('back')
      })

    }else
    {
      return res.redirect('back')
    }

  })

}



module.exports = {
  destroy,
  seepost,
  storepost,
};
