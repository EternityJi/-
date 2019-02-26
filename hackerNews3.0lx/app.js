const express = require("express");

const path = require("path");

//引入获取body数据的模块
const bodyParser = require('body-parser');

//引入router模块
const router = require("./router");
//模版引擎
const template = require("art-template");



const app = express();

app.use(bodyParser.urlencoded({extended:false}));



// //配置模板
app.engine('html',require('express-art-template'));
//配置模板路径
app.set('views','views');
//脱管静态资源
app.use('/assets',express.static('assets'))

//将post请求参数转化为对象  存储到req.body


app.use((req, res, next) => {
  console.log(req.url);    
  next();
})

app.use(router);

app.listen(9999,()=>{
  console.log("http://localhost:9999");
  
})