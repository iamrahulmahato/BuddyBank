const mongoose=require('mongoose')
const postSchema=mongoose.Schema({

    content:{
        type:String,
        required:true

    },
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }

    

},{
    timestamps:true
})


const Comment=mongoose.model("Comment",postSchema)
module.exports=Comment