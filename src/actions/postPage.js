import fetch from 'isomorphic-fetch';
import { config } from '../config.js';

export function setPostTitle(title) {
  return {
    type: 'SET_POST_TITLE',
    title
  };
}

export function setPostBody(body) {
  return {
    type: 'SET_POST_BODY',
    body
  };
}

export function setPostUser(user) {
  return {
    type: 'SET_POST_USER',
    user
  };
}

export  function getPostData(postId) {
  return (dispatch) => {
    const url = `${config.url}/${postId}`;
    fetch(url)
      .then( (response) => response.json() )
      .then( (json) =>
        {
          dispatch(setPostTitle(json.title));
          dispatch(setPostBody(json.body));
          dispatch(setPostUser(json.userId))
        }
      );
  }
}

export function setPostComments(comments) {
  return {
    type: 'SET_POST_COMMENTS',
    comments
  };
}

export function getPostComments(postId) {
  return (dispatch) => {
    const url = `${config.url}/${postId}/comments`;
    fetch(url)
      .then( (response) => response.json() )
      .then( (json) =>
        {
          dispatch(setPostComments(json));
        }
      );
  }
}

export function setPostsAfterAdding(posts) {
  return {
    type: 'SET_POSTS',
    posts
  }
}

export function setFilteredPosts(filteredPosts) {
  return {
    type: 'SET_FILTERED_POSTS',
    filteredPosts
  }
}

export function addPost() {
  return (dispatch, getState) => {

    const data = {
      title: getState().title,
      body: getState().body,
      userId: getState().userId
    }

    const fetchData = {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch(config.url, fetchData)
      .then( (response) => response.json() )
      .then( (json) => {
        dispatch(setPostsAfterAdding([]));
        dispatch(setFilteredPosts([]))
        console.log('dodano')
        //this.setState({info: `Post #${json.id} was saved.`})
      });

  }
}




