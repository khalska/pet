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
      .then((posts) => dispatch(postsFetchDataSuccess(posts)))
      .catch(() => dispatch(postsHasErrored(true)));
  };
}

