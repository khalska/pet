import fetch from 'isomorphic-fetch';

/*
 * action creators
 */

export function actionIncrement() {
  return { type: 'INCREMENT' }
}



export function actionChangeSearch(searchedPhrase) {
  return { type: 'CHANGE_SEARCH2', searchedPhrase }
}

export function actionGetPosts(posts) {
  return { type: 'GET_POSTS', posts}
}

export function actionFilterPosts() {
  return { type: 'FILTER_POSTS' }
}


export function postsHasErrored(bool) {
  return {
    type: 'POSTS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function postsIsLoading(bool) {
  return {
    type: 'POSTS_IS_LOADING',
    isLoading: bool
  };
}

export function postsFetchDataSuccess(posts) {
  return {
    type: 'POSTS_FETCH_DATA_SUCCESS',
    posts
  };
}

export function postsFetchData(url) {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    fetch(url)
      .then((response) => {

        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(postsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((posts) => {
        dispatch(postsFetchDataSuccess(posts))
        dispatch(postsFilter(posts))
      })
      .catch(() => dispatch(postsHasErrored(true)));
  };
}

export function postsFilter(filteredPosts) {
  return {
    type: 'POSTS_FILTER',
    filteredPosts
  };
}

export function getFilteredPosts() {
  return ( dispatch, getState ) => {
    const searchedPhrase = getState().searchedPhrase.toLowerCase();
    let filteredPosts = getState().posts;

    if (searchedPhrase !== '') {
      filteredPosts = filteredPosts.filter( (post) => {
        if (post.hasOwnProperty('title') && post.hasOwnProperty('body')) {
          const title = post.title.toLowerCase();
          const body = post.body.toLowerCase();
          return (title.indexOf(searchedPhrase) >= 0 || body.indexOf(searchedPhrase) >= 0);
        }
      });
    }

    dispatch(postsFilter(filteredPosts));
  }
}

export function changeSearchedPhrase(searchedPhrase) {
  return {
    type: 'CHANGE_SEARCHED_PHRASE',
    searchedPhrase
  };
}