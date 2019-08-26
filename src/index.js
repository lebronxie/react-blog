import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'
import App from './App'

// 获取工厂函数
// const store = configureStore()

ReactDOM.render(
    <Provider store={configureStore}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
