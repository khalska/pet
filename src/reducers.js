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

    case 'FILTER_POSTS': {
      const phrase = state.searchedPhrase.toLowerCase();
      let filteredPosts = state.posts;

      filteredPosts = filteredPosts.filter( (post) => {
        if (post.hasOwnProperty('title') && post.hasOwnProperty('body')) {
          const title = post.title.toLowerCase();
          const body = post.body.toLowerCase();
          return (title.indexOf(phrase) >= 0 || body.indexOf(phrase) >= 0);
        }
      });

      return { ...state, filteredPosts }
    }

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