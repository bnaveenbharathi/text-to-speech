const express=require('express');
const bodyparser=require('body-parser')
const gtts = require('gtts');
const morgan=require('morgan');
const fs=require('fs')

const app=express()

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.render('index')
})

app.post('/',(req,res)=>{
  const text=req.body.text
  const speech=new gtts(text)
  speech.save('output.mp3',(err,result)=>{
      if(err){
        console.log(err)
        res.status(500).send("Error occcured")
      }else{
        res.download("output.mp3",'output.mp3',(downloaderr)=>{
          if(downloaderr){
            console.log(downloaderr)
          }
          fs.unlinkSync('output.mp3');
        })
      }
  })
})

app.listen(8080,()=>{
    console.log('server is running and http://localhost:8080')
})