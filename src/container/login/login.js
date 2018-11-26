import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const mapStatetoProps = (redux)=>{
  return { user: redux.user }
}
const actionCreator = {login}

class Login extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register(){
    this.props.history.push('/register')
  }

  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleLogin(){
    this.props.login(this.state)
  }

  render(){
    //console.log(this.props);
    return(
      <div>
        {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/>:null}
        <Logo></Logo>
        <h2>登陆页</h2>
        <WingBlank>
          <List>
            <InputItem onChange={v=>this.handleChange('user',v)}
              >用户</InputItem>
            <InputItem
              onChange={v=>this.handleChange('pwd',v)}
              type='password'
              >密码</InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type='primary'>登陆</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

Login = connect(mapStatetoProps, actionCreator)(Login)

export default Login
