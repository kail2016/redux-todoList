// action类型名称
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS' ;

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

// 过滤类型常量
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL', // 全显示
  SHOW_COMPLETED: 'SHOW_COMPLETED', // 只显示完成
  SHOW_ACTIVE: 'SHOW_ACTIVE' // 只显示未完成
};


// 用户添加待办项 action函数
export const addTodo = text => {
  return {
    type: ADD_TODO,
    text
  }
}

// 用户点击触发完成 action函数 index 具体待办项id
export const completeTodo = index => {
  return {
    type: COMPLETE_TODO,
    index
  }
}

// 用户进行过滤待办项 action函数
export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

//同步
//用户可以选择要显示的 subreddit
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}


//刷新按钮 更新
export function invalidatesubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}
//发帖
export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}