const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/fwork'
mongoose.connect(DB_URL,{useNewUrlParser:true})

const models ={
  user:{
    'user':{'type':String, 'require':true},
    'pwd': {'type':String, 'require':true},
    'type':{'type':String, 'require':true},

    'avatar':{'type':String},
    'desc':{'type':String},
    'title':{'type':String},

    //Boss属性
    'company':{'type':String},
    'money':{'type':String}
  }
}

for( let m in models ){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}
