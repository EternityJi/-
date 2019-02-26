//加载express模块
const express = require("express");
const path =require("path");
const fs = require("fs");
//调用express.Router()方法   得到一个路由容器
const router = express.Router();
//暴露路由
module.exports = router;
//为路由添加不同的路由
router.get('/index',(req,res)=>{
  
  //  res.send("hello router")
   //读取json数据
   readDate(data=>{
      // console.log(data);
      // res.send('111')
        data.list.sort((a,b)=>b.id-a.id);
        res.render('index.html',data);
       
   })
  // res.sendFile(path.join(__dirname,'data','data.json'));




})
router.get('/',(req,res)=>{
   res.redirect('index');
})
router.get('/details',(req,res)=>{
   //获取id 
   let id = req.query.id;
  //  console.log(id);
     readDate(data=>{
        data = data.list.find(v=>{
          return v.id ==id;
        })
        // console.log(data);
        
        res.render('details.html',data);
     })

   
  
})
router.get('/submit',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','submit.html'))
})
router.post('/add',(req,res)=>{
   //获取req的数据
   let info = req.body;
   console.log(info)
   readDate(data=>{
      info.id = data.list[data.list.length-1].id + 1;
      // console.log(info);
      data.list.push(info);
      data = JSON.stringify(data,null,2);
      writeData(data, ()=>{
        res.redirect('/')
     })
       
   });
   

})



//读数据
function readDate(callback){
     fs.readFile(path.join(__dirname,'data','data.json'),(err, data)=>{
          if(err){
            console.log("请求数据有误");
          }
          data = JSON.parse(data);
          // res.send(data);
          callback && callback(data);
     })
}
//写数据
function writeData(data, callback){
  fs.writeFile(path.join(__dirname,'data','data.json'),data,err=>{
       if(err){
         console.log("读数据有错误");
       }
       callback && callback();
  })
}