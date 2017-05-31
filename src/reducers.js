import { combineReducers } from 'redux'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'CHANGE_SEARCH':
      return { ...state, searchedPhrase: action.searchedPhrase };
    case 'CHANGE_SEARCH2':
      return { ...state, searchedPhrase: action.searchedPhrase };

    case 'GET_POSTS':
      return { ...state, posts: action.posts, filteredPosts: action.posts }

    default:
      return state;
  }
};

const myApp = combineReducers({
  //visibilityFilter,
  //todos,

  reducer
})

export default reducer