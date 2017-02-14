import { VisibilityFilters } from '/actions/actions.js';

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state, action) {
    if (typeof state == 'undefined') {
        return initialState;
    }

    return state;
}

// ES6默认值语法
// function todoApp(state = initialState, action) {
//     return state;
// }

// function todoApp(state = initialState, action) {
//     switch (action.type) {
//         case SET_VISIBILITY_FILTER:
//             return Object.assign({}, state, {
//                 visibilityFilter: action.filter
//             })
//         case ADD_TODO:
//             return Object.assign({}, state, {
//                 todos: [
//                     ...state.todos,
//                     {
//                         text: action.text,
//                         completed: false
//                     }
//                 ]
//             })
//         case TOGGLE_TODO:
//             return Object.assign({}, state, {
//                 todos: state.todos.map((todo, index) => {
//                     if (index === action.index) {
//                         return Object.assign({}, todo, {
//                             completed: !todo.completed
//                         })
//                     }
//                     return todo
//                 })
//             })
//         default:
//             return state;
//     }
// }

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.type,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function todoApp(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
        case TOOGGLE_TODO:
            return Object.assign({}, state, {
                todos: todos(state.todos, action)
            })
        default:
            return state
    }
}