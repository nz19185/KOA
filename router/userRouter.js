const express = require('express')
const router = express.Router()//实例化路由
const userModel = require('../db/model/userModel')
const { delusers, updatePs, userlist } = require('../controls/usercontrols')
//管理员注册的接口
/**
 * @api {get} /user/reg 管理员注册 params
 * @apiName reg
 * @apiGroup user
 * 
 * @apiParam {string} us 用户名
 * @apiParam {string} ps 密码
 
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * 
 */
router.get('/reg', (req, res) => {
   // console.log(req.query);
   let { us, ps } = req.query
   //数据处理，存入数据库
   // console.log(us,ps);
   userModel.findOne({ us })
      .then((data) => {
         console.log(data);
         if (data == null) {
            userModel.insertMany({ us: us, ps: ps })
               .then((data) => {
                  console.log('data', data);
                  res.send({ code: 0, msg: '注册ok' })
               })
               .catch((err) => {
                  res.send({ code: 1, msg: '注册失败' })
               })

         } else {
            res.send({ code: -1, msg: '用户名重复' })
         }

      })
      .catch((err) => {
         res.send({ code: -2, mag: '查询出错' })

      })




})

//管理员登录

/**
 * @api {post} /user/login 管理员登录 
 * @apiName login
 * @apiGroup user
 * 
 * @apiParam {string} us  用户名
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * 
 */
router.post('/login', (req, res) => {
   // console.log(req.body);
   let { us, ps } = req.body
   userModel.findOne({ us, ps })
      .then((data) => {
         console.log('data', data);
         if (data.us == us && data.ps == ps) {
            res.send({ code: 0, msg: '登录ok' })
         } else {
            res.send({ code: -1, msg: '密码错误' })
         }
      })
      .catch((err) => {
         res.send({ code: 1, msg: '不存在此用户名' })
      })

})

//管理员的删除


/**
 * @api {post} /user/del 管理员删除
 * @apiName del
 * @apiGroup user
 * 
 * @apiParam {string} _id  管理员的id
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * 
 */
router.post('/del', (req, res) => {
   let { _id } = req.body
   delusers(_id)
      .then((data) => {
         //  console.log('data',data);
         res.send({ code: 0, msg: '删除ok' })
      })
      .catch((err) => {
         res.send({ code: 1, msg: '删除失败' })
      })

})
//管理员修改密码

/**
 * @api {post} /user/updatePs 管理员修改密码
 * @apiName pdatePs
 * @apiGroup user
 * 
 * @apiParam {string} _id  管理员的id
 * @apiParam {string} ps  修改的密码
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * 
 */
router.post('/updatePs', (req, res) => {
   let { _id, ps } = req.body
   updatePs(_id, { ps })
      .then((data) => {
         console.log('data', data);
         res.send({ code: 0, msg: '更改密码ok' })
      })
      .catch((err) => {
         res.send({ code: 1, msg: '更改密码失败' })
      })

})

//管理员列表


/**
 * @api {post} /user/list 管理员列表
 * @apiName list
 * @apiGroup user
 * 
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示.
 * 
 */
router.post('/list', (req, res) => {
   userlist()
      .then((data) => {
         // console.log('data',data);
         res.send({ code: 0, msg: '查询成功', lsit: data })
      })
      .catch((err) => {
         res.send({ code: 1, msg: '查询失败' })
      })

})




module.exports = router
