const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas successfully'))
.catch((err) => console.error('Error connecting to MongoDB:', err));