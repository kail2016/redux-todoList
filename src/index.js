import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';
import './style/index.css';
// 利用redux-logger打印日志
import {createLogger} from 'redux-logger'
// 安装redux-devtools-extension的可视化工具。
import {composeWithDevTools} from 'redux-devtools-extension'
// 使用日志打印方法， collapsed让action折叠，看着舒服。


// const loggerMiddleware = createLogger({collapsed: true});

//1. 从Redux模块中汇入createStore方法
let store = createStore(todoApp, composeWithDevTools());

//这就是你获取到的数据state tree，由于使用了subscribe，当数据更改时会重新获取
store.subscribe(() => {
    let state = store.getState();
    console.debug(store);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
