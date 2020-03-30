const express =require('express')
var path = require('path');
var bodyParser = require('body-parser');//用于req.body获取值的

// 创建 application/x-www-form-urlencoded 编码解析
const app=express();
//引入路由
let userRouter=require('./router/userRouter')
let bookRouter =require('./router/bookRouter')
let uploadRouter =require('./router/uploadRouter')
//服务器启动时链接数据库
const db = require('./db/connect')
//静态资源路径
app.use('/public',express.static(path.join(__dirname,'./public')))
//post 数据的解析 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/user',userRouter)
app.use('/book',bookRouter)
app.use('/upload',uploadRouter)

app.listen(3000,()=>{
    console.log('server start');
    
})