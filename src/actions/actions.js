import fetch from 'isomorphic-fetch';
import { config } from '../config.js';
/*
 * action creators
 */

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

export function setPosts(posts) {
  return {
    type: 'SET_POSTS',
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
        dispatch(setPosts(posts))
        dispatch(postsFilter(posts))
        dispatch({ type: 'SET_LAST_POST_ID', lastPostId: 100 })
      })
      .catch(() => dispatch(postsHasErrored(true)));
  };
}

export function postsFilter(filteredPosts) {
  return {
    type: 'SET_FILTERED_POSTS',
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

export function deletePostAction(postId) {
  return (dispatch, getState) => {
    const url = `${config.url}/${postId}`;

    fetch(url, {method: 'DELETE'})
      .then( () => {
        postId = getState().postToDelete;

        let posts = getState().posts;

        posts.forEach((item, index) => {
          if (item.id === postId) {
            posts.splice(index,1);
          }
        });

        dispatch(postsFilter(posts));
        dispatch(setPosts(posts));
      });
  }
}
