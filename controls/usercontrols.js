//将数据库相关的操作抽离处理

const userModel =require('../db/model/userModel')
//管理员的删除
let delusers=async(_id) =>{
  let result=await userModel.deleteOne({_id})
  console.log(result);
  return result
  
}

//管理员修改密码
let updatePs=async(_id,updateinfo)=>{
    let result=await userModel.updateOne({_id},updateinfo)
    console.log(result);
    return result
}

//管理员列表
let userlist =async()=>{
    let result =await userModel.find();
    return result
}



module.exports={delusers,updatePs,userlist}
