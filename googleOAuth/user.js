const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

mongoose.connection.once('open',function () {
    console.log('Connection to the mongoDB database has been established');
}).on('error',function(error){
    console.log('Connection error in connecting to MongoDB database');
})


module.exports = mongoose.model('User', userSchema);