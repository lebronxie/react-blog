import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'


const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {
    const logger = createLogger({
        diff: true,
        collapsed: true
    })
    middlewares.push(logger)
}
export default createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares), // 需要使用的中间件数组
        // 浏览器插件
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)