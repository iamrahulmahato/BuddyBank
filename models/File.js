const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    size: Number,
    originalname: String
}, {
    timestamps: true
});


const File = mongoose.model("File", fileSchema);
module.exports = File;