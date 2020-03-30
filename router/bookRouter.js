const express =require('express');
const {insertBook,
    findBook,
    delBook,
    updateBook,
    findBookByPage,
    findbookByType,
    findbookKey}=require('../controls/bookcontrols')
const router =express.Router()
//添加书籍

/**
 * @api {post} /book/add 添加书籍
 * @apiName add
 * @apiGroup book
 *
 * @apiParam {string} name 书籍名字
 * @apiParam {string} auctor 作者名字
 * @apiParam {Number} price 价格
 * @apiParam {string} booktype 书籍类别
 * @apiParam {string} desc 书籍描述
 *  @apiParam {string} path 书籍路径
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/add',(req,res)=>{
    //接收数据
    // console.log(req.body);
    let {name,auctor,price,booktype,desc,path} =req.body
    insertBook({name,auctor,price,booktype,desc,path})
    .then((data)=>{
    res.send({code:0,msg:'插入成功'})
 })
 .catch((err)=>{
     res.send({code:-1,msg:'插入失败'})
 })
})

//查询全部书籍
/**
 * @api {post} /book/info 查询书籍
 * @apiName info
 * @apiGroup book
 *

 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * @apiSuccess {String} list  查询到的数据.
 */
router.post('/info',(req,res)=>{
    findBook()
    .then((data)=>{
        res.send({code:0,msg:'查询成功',list:data})
     })
     .catch((err)=>{
         res.send({code:-1,msg:'查询失败'})
     })
})

//删除书籍
/**
 * @api {post} /book/del 删除书籍
 * @apiName del
 * @apiGroup book
 *
 * @apiParam {string} _id 书籍的id
 
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/del',(req,res)=>{
    //获取要删除的数据id
     let {_id} =req.body
     console.log(_id);
     
     delBook(_id)
     .then((data)=>{
        res.send({code:0,msg:'删除成功'})
     })
     .catch((err)=>{
         res.send({code:-1,msg:'删除失败'})
     })

})
//修改书籍
/**
 * @api {post} /book/update 修改书籍
 * @apiName update
 * @apiGroup book
 * 
 * @apiParam {string} _id 根据书籍的id 修改书籍的信息
 * @apiParam {string} name 书籍名字
 * @apiParam {string} auctor 作者名字
 * @apiParam {Number} price 价格
 * @apiParam {string} booktype 书籍类别
 * @apiParam {string} desc 书籍描述
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/update',(req,res)=>{
    //获取修改数据的参数
    let { _id,name,auctor,price,booktype,desc}=req.body
    updateBook(_id,{name,auctor,price,booktype,desc})
    .then((data)=>{
        res.send({code:0,msg:'修改成功'})
     })
     .catch((err)=>{
         res.send({code:-1,msg:'修改失败'})
     })

})
//分页查询
/**
 * @api {post} /book/getinfo 分页查询书籍
 * @apiName getinfo
 * @apiGroup book
 * 
 * @apiParam {string} page 书籍的第几页数据
 * @apiParam {string} pageSize 每页的书籍数
 
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 *  @apiSuccess {String} list  返回信息.
 *  @apiSuccess {String} msg  总的书籍条数.
 */
router.post('/getinfo',(req,res)=>{
    let page=req.body.page||1//查询的第几页数据  默认
    let pageSize=req.body.pageSize||2//每页几条数据  默认两条
    findBookByPage(page,pageSize)
    .then((data)=>{
        console.log(1111);
        // console.log(data);
        let {result,allcount}=data
        
        res.send({code:0,msg:'查询成功',list:result,allcount})
     })
     .catch((err)=>{
         res.send({code:-1,msg:'查询失败'})
     })


})

//分类查询
/**
 * @api {post} /book/getinfoByType 根据类别查询
 * @apiName getinfoByType
 * @apiGroup book
 * 
 *
 * @apiParam {string} booktype 书籍类别
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 *  @apiSuccess {String} list  返回信息.
 */
router.post('/getinfoByType',(req,res)=>{
   let {booktype} =req.body
   console.log(booktype);
   
   findbookByType(booktype)
   .then((data)=>{
       console.log(data);
       
    res.send({code:0,msg:'分类查询成功',list:data})
 })
 .catch((err)=>{
     res.send({code:-1,msg:'分类查询失败'})
 })

})

//关键字查询
/**
 * @api {post} /book/getinfoKey 关键字查询书籍
 * @apiName getinfoKey
 * @apiGroup book
 * 
 * @apiParam {string} key 输入的关键字，匹配描述和名字
 
 
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 *  @apiSuccess {String} list  返回信息.
 * 
 */
router.post('/getinfoKey',(req,res)=>{
 let {key} =req.body||''
 findbookKey(key)
 .then((data)=>{
    console.log(data);
    
 res.send({code:0,msg:'关键字查询成功',list:data})
})
.catch((err)=>{
  res.send({code:-1,msg:'关键字查询失败'})
})

})

module.exports=router
