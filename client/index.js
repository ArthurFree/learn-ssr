// // import React from 'react';
// // import ReactDOM from 'react-dom';

// // class Root extends React.Component {
// // 	render() {
// // 		return (
// // 			<div>
// // 				hello,world!!!
// // 			</div>
// // 		)
// // 	}
// // }

// // ReactDOM.render(<Root />, document.querySelector(".content"));


// import { createStore } from 'redux';

// function counter(state = 0, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }


// let store = createStore(counter);

// store.subscribe(() => {
//     console.log(store.getState())
// });


// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'INCREMENT' });
// store.dispatch({ type: 'DECREMENT' });


// // // Action
// // const ADD_TODO = 'ADD_TODO';

// // // action对象除了`type`字段外，其结构完全由自己决定
// // // export function addToDO() {
// // //     return {
// // //         type: ADD_TODO,
// // //         text: 'Build my first Redux app'
// // //     }
// // // }

// // // 添加新todo任务action

// // {
// //     type: ADD_TODO,
// //     text: 'Build my first Redux app'
// // }

// // // 表示用户完成任务
// // {
// //     type: TOGGLE_TODO,
// //     index: 5
// // }

// // // 表示当前的任务展示选项
// // {
// //     type: SET_VISIBILITY_FILTER,
// //     filter: SHOW_COMPLETED
// // }

import { tools } from "utils"

console.log("tools", tools);

console.log("$", $);

