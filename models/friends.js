const mongoose= require('mongoose')

const friendSchema = new mongoose.Schema({

token: String,
friendName: String,
friendId : String,
status : {
    type : String,
    default : "pending"
},


})

const friend = mongoose.model('friend',friendSchema)


module.exports = friend