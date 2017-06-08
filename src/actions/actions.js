import fetch from 'isomorphic-fetch';
import { config } from '../config.js';
import {browserHistory} from 'react-router';
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

export function postsFetchData() {
  return (dispatch) => {
    dispatch(postsIsLoading(true));
    const url = config.url.posts;

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
        else return false;
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

function fetchDelete(postId) {
  const url = `${config.url.posts}/${postId}`;

  return fetch(url, {method: 'DELETE'}).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });
}

export function deleteCatSuccess(postId) {
  return {type: 'DELETE_SUCCESS', postId}
}

export function deleteCat(postId) {
  return function (dispatch) {
    return fetchDelete(postId).then(() => {
      console.log(`Deleted ${postId}`)
      dispatch(deleteCatSuccess(postId));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

export function deletePostAction(postId) {
  return (dispatch, getState) => {
    const url = `${config.url.posts}/${postId}`;

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
        browserHistory.push('/');
      });
  }
}

export function choosePostToDelete(postToDelete) {
  return {
    type: 'CHOOSE_POST_TO_DELETE',
    postToDelete
  };
}

export function setInfo(info) {
  return {
    type: 'SET_INFO',
    info
  };
}