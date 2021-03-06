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
      title: getState().inputTitleValue,
      body: getState().textareaBodyValue,
      userId: getState().userValue,
      id: getState().lastPostId + 1
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
        const posts = getState().posts;
        posts.push(fetchData.body);

        dispatch(setPostsAfterAdding(posts));
        dispatch(setFilteredPosts(posts))
        dispatch({ type: 'INCREMENT_LAST_POST_ID' })

        clearForm(dispatch);

        //this.setState({info: `Post #${json.id} was saved.`})
      });

  }
}

function clearForm(dispatch) {
  dispatch(setPostTitle(''));
  dispatch(setPostBody(''));
  dispatch(setPostUser(''));
}

export function updatePost(postId) {
  return (dispatch, getState) => {
    const data = {
      id: postId,
      title: getState().inputTitleValue,
      body: getState().textareaBodyValue,
      userId: getState().userValue,
    };

    const fetchData = {
      method: 'PUT',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    const url = `${config.url}/${postId}`;

    fetch(url, fetchData)
      .then( (response) => {
        let posts = getState().posts;

        posts = posts.filter( (post) => {
          if (post.id == postId) {
            post.title = fetchData.body.title;
            post.body = fetchData.body.body;
            post.userId = fetchData.body.userId
            return true;
          }
        });
        //const info = (response.ok) ? 'Changes in post was saved.' : 'Error!'
        //this.setState({info})
      });
  }
}
