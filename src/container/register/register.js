import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  Radio } from 'antd-mobile'
  import { Redirect } from 'react-router-dom'
  import { connect } from 'react-redux'
  import { register } from '../../redux/user.redux'


const mapStatetoProps = (redux)=>{
  return { user: redux.user }
}
const actionCreator = {register}


class Register extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repwd:'',
      type:'geek'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
    console.log(this.state)
  }

  render(){
    const RadioItem = Radio.RadioItem;
    console.log(this.props);
    return (
      <div>
        {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/>:null}
        <Logo></Logo>
        <List>
          {this.props.user.msg?<p>{this.props.user.msg}</p>:null}
          <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
          <InputItem
            type='password'
            onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
          <InputItem
            type='password'
            onChange={v=>this.handleChange('repwd',v)}>确认密码</InputItem>
          <RadioItem
            checked={this.state.type==='geek'}
            onChange={v=>this.handleChange('type','geek')}
              >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type==='boss'}
            onChange={v=>this.handleChange('type','boss')}
            >
            BOSS
          </RadioItem>
        </List>
        <WhiteSpace />
        <Button onClick={this.handleRegister} type='primary'>注册</Button>
      </div>

    )
  }
}

Register = connect(mapStatetoProps, actionCreator)(Register)

export default Register
