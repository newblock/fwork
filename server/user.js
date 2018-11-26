const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const bodyParser = require('body-parser')
const utils = require('utility')

Router.get('/info',function(req, res){
  //用户有没有Cookie
  return res.json({code:1})
})

Router.get('/list',function(req,res){
  //User.deleteMany({},function(e,d){})
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/update',function(req,res){
  const body = req.body
  const {userid} = body
  console.log('uid = '+userid);
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body )
    console.log(data);
    return res.json({code:0, data})
  })
  // User.findOne({_id:userid},{'pwd':0},function(err,doc){
  //   if( !doc ){
  //     return res.json({code:1,msg:'用户名或者密码错误!'})
  //   }
  //
  //   console.log(doc);
  //   return res.json({code:0, data:doc})
  // })
})

Router.post('/login', function(req,res){
  const {user, pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0},function(err,doc){
    if( !doc ){
      return res.json({code:1,msg:'用户名或者密码错误!'})
    }
    return res.json({code:0, data:doc})
  })
})

Router.post('/register',bodyParser.json(),function(req, res){
  console.log('aaa:'+req.body);
  const {user, pwd, type} = req.body
  console.log('bbb:'+user);
  User.findOne({user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    User.create({user,type,pwd:md5Pwd(pwd)},function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }
      return res.json({code:0})
    })
  })
})

function md5Pwd(pwd){
  const salt = 'fwork_is_fine_2018%^*~@~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
