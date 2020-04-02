//将数据库相关的操作抽离处理

const bookModel =require('../db/model/bookModel')
//插入书籍
let insertBook=async (obj)=>{//访问数据库异步操作
  let result= await bookModel.insertMany(obj)
  console.log(result);
  
}
//查询书籍
let findBook =async()=>{
    let result =await bookModel.find()
    return result
}
//删除书籍
let delBook=async(_id)=>{
   let result =await bookModel.deleteOne({_id})
   return result
}
//修改书籍
let updateBook =async (_id,updateinfo)=>{
    let result =await bookModel.updateOne({_id},updateinfo)
    return result
}
//分页查询
let findBookByPage =async(page,pageSize)=>{

    //总数居
    let all=await bookModel.find()
    let allcount =all.length
    //每一页德数据
   let result =await bookModel.find().skip((Number(page)-1)*pageSize).limit(Number(pageSize))
// let result =await bookModel.find().skip(0).limit(2)
   console.log(result);
   
   return {result,allcount}
}
//分类查询
let findbookByType =async (booktype)=>{
    let result = await bookModel.find({booktype})
    return result
}
//关键字查询
let findbookKey =async (key)=>{
    //通过正则表达式匹配
    let regex= new RegExp(key)
    // let result =await bookModel.find({desc:{$regex:regex}})
    let result =await bookModel.find({$or:[{desc:{$regex:regex}},{name:{$regex:regex}}]})
    return result

}
//id查询书籍
let findbookById =async (_id)=>{
    let result = await bookModel.findOne({_id})
    return result
    
}

module.exports={insertBook,findBook,delBook,updateBook,findBookByPage,findbookByType,findbookKey,findbookById}