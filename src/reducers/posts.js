export function postsReducer (state = [], action) {
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

export function postsHasErrored(state = false, action) {
  switch (action.type) {
    case 'POSTS_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case 'POSTS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case 'POSTS_FETCH_DATA_SUCCESS':
      return action.posts;

    default:
      return state;
  }
}
