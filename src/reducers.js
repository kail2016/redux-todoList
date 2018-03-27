/*reducer 是纯方法
 * 传入旧状态和action
 * 返回新状态
 */
import {combineReducers} from 'redux';
import {
    ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters,
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from './actions';
const {SHOW_ALL} = VisibilityFilters;
/*
 ES6解构赋值。
 const { SHOW_ALL } = VisibilityFilters;
 相当于 const SHOW_ALL = VisibilityFilters.SHOW_ALL
 */
// 过滤器 响应
const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

// 待办项 响应
const todos = (state = [], action) => {
    switch (action.type) {
        // 添加待办事项
        case ADD_TODO:
            // 使用扩展运算符...[{text:"" , completed: ""}]
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        // 点击触发完成
        case COMPLETE_TODO:
            return [
                // slice 返回数组指定元素
                ...state.slice(0, action.index),
                // assign 合并
                Object.assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

function selectedsubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

function posts(state = {
                   isFetching: false,
                   didInvalidate: false,
                   items: []
               },
               action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            })
        default:
            return state
    }
}

//2.写一个reducer（归纳函数）
// 不同响应合并成一个reducer
const todoApp = combineReducers({
    visibilityFilter,
    todos,
    postsBySubreddit,
    selectedsubreddit
})

export default todoApp;
