//创建数据模型
const mongoose= require('mongoose')

let bookSchems = mongoose.Schema({
     name :{type:String,required:true},
     auctor :{type:String,required:true},
     price :{type:Number,required:true},
     desc :{type:String,required:true},
     booktype :{type:String,required:true},
     path :{type:String,required:true}
})

let bookModel = mongoose.model('books',bookSchems)
module.exports=bookModel