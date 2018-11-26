import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  //Redirect,
  //Switch
} from 'react-router-dom'
import AuthRoute from './component/authroute/authroute'
import './index.css'


import reducers from './reducer'
import './config'
import App from './App';
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeekInfo from './container/geekinfo/geekinfo'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geekinfo' component={GeekInfo}></Route>
          <Route path='/auth' component={AuthRoute}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/' exact component={App}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  ),

  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
