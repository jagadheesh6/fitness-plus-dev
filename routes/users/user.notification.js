const router = require('express').Router()

////Midlleware
const verifyAuth = require("../../auth/verify.auth");
const date = require("../../utility/date");

///Database Model
const User = require("../../models/user");
const Work = require("../../models/work");
const FriendReq = require('../../models/friends.req');
const Friend = require('../../models/friend');
const Notify = require('../../models/notify')


/////Search Notifications and alert User////

router.post('/notify', verifyAuth,async(req,res)=>{
const {id} = req.userData

var notify = await Notify.countDocuments({
    token: id,
    alert : true

})

if(notify !==0 ){
    await Notify.updateMany({token: id},{
        alert : false
    })
}

res.send({status:notify})


})


///View all past notifications

router.post('/notifications', verifyAuth,async(req,res)=>{
const {id} = req.userData


var notification = await Notify.find({
    token : id,
    date : req.body.date
}).sort({_id: -1})

res.status(200).send(notification)

await Notify.updateMany({
    token : id,
    date : req.body.date
},{
    notify : false
})



})



module.exports = router