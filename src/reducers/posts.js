export function postsReducer (state = [], action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };

    case 'CHANGE_SEARCH':
      return { ...state, searchedPhrase: action.searchedPhrase };

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

    case 'GET_POSTS_AFTER_DELETE':
      return action.posts

    default:
      return state;
  }
}

export function searchedPhrase(state = '', action) {
  switch (action.type) {
    case 'CHANGE_SEARCHED_PHRASE':
      return action.searchedPhrase;

    default:
      return state;
  }
}

export function filteredPosts(state = [], action) {
  switch (action.type) {
    case 'POSTS_FILTER':
      return action.filteredPosts;

    default:
      return state
  }
}

export function postToDelete(state = -1, action) {
  switch (action.type) {
    case 'CHOOSE_POST_TO_DELETE':
      return action.postToDelete;

    default:
      return state
  }
}