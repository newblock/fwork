import React from 'react'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
 } from 'antd-mobile'
import  AvatarSelector  from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update }  from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const mapStatetoProps = (redux)=>{
  return { state: redux.user }
}
const actionCreator = {update}

class BossInfo extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      avatar:'',
      title:'',
      company:'',
      money:'',
      desc:'',
      userid:''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount(){
    this.setState({
      userid:this.props.state._id
    })
  }
  onChange(key,val){
    this.setState({
      [key]:val
    })
  }

  handleClick(){
    this.props.update(this.state)
  }

  render(){
    console.log(this.props)
    const path = this.props.location.pathname
    const redirect = this.props.state.redirectTo
    console.log('path: '+path);
    console.log('redirect: '+redirect);
    return(
      <div>
       {redirect&&redirect!==path?<Redirect to={this.props.state.redirectTo} />:null}
        <NavBar mode="dark">
        BOSS完善信息页面
        </NavBar>
        <AvatarSelector
          selectorAvatar={(img)=>{
            this.setState({
              avatar:img
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('money',v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          onChange={(v)=>this.onChange('desc',v)}
          rows={3}
          autoHeight
          title='职位要求'>
          职位简介
        </TextareaItem>
        <Button
          onClick={this.handleClick}
          type='primary'>保存</Button>
      </div>
    )
  }
}

BossInfo = connect(mapStatetoProps, actionCreator)(BossInfo)

export default BossInfo
