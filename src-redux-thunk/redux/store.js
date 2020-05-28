//redux 最核心的管理对象：store
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'
import thunk from 'redux-thunk'  //用来实现redux异步的redux中间件
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

