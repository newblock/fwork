
import axios from 'axios'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = "LOGIN_SUCCESS"
const ERROR_MSG = "ERROR_MSG"
//const UPDATE_SUCCESS = "UPDATE_SUCCESS"

const initState={
  msg:'',
  user:'',
  pwd:'',
  type:''
}

export function user(state=initState, action)
{
  switch(action.type){
    case AUTH_SUCCESS:
      console.log(action.payload);
      return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

function authSuccess(data){
  return {type:AUTH_SUCCESS,payload:data}
}

export function update(data){
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }
        else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({user,pwd}){
  if(!user||!pwd){
    return errorMsg('用户密码输入')
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
    .then(
      res=>{
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess(res.data.data))
        }
        else{
          dispatch(errorMsg(res.data.msg))
        }
      }
    )
  }
}

export function register({user,pwd,repwd,type}){
  if(!user||!pwd){
    return errorMsg("用户名密码必须输入")
  }
  if(pwd !== repwd){
    return errorMsg('密码和确认密码不同')
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
    .then(
      res=>{
        if(res.status===200&&res.data.code===0){
          dispatch(authSuccess({user,pwd,type}))
        }
        else{
          dispatch(errorMsg(res.data.msg))
        }
      }
    )
  }
}
