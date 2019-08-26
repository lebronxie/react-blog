
import React, { Component, Fragment } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import routes from './routes'
import Frame from './components/Frame'
export default class App extends Component {

  render() {
    return (
      <Fragment >
        <Frame>
          <Switch>
            {/* 根据路由渲染不同页面 */}
            {
              routes.map((route) => {
                return (<Route
                  exact={route.exact}
                  key={route.path}
                  path={route.path}
                  component={route.component}
                />)
              })
            }
            <Redirect from="/" to="home" />
            <Redirect to="404" exact />
          </Switch>
        </Frame>
      </Fragment>
    )
  }
}
