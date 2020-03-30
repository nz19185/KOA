//创建数据模型
const mongoose= require('mongoose')

let userSchems = mongoose.Schema({

    us:{type:String},
    ps:{type:String}
})

let userModel = mongoose.model('users',userSchems)
module.exports=userModel