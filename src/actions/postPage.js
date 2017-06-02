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
//
// export function postsFetchData(url) {
//   return (dispatch) => {
//     dispatch(postsIsLoading(true));
//
//     fetch(url)
//       .then((response) => {
//
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//
//         dispatch(postsIsLoading(false));
//         return response;
//       })
//       .then((response) => response.json())
//       .then((posts) => {
//         dispatch(postsFetchDataSuccess(posts))
//         dispatch(postsFilter(posts))
//       })
//       .catch(() => dispatch(postsHasErrored(true)));
//   };
// }


// __getPostData(postId) {
//   const url = `${config.url}/${postId}`;
//   fetch(url)
//     .then( (response) => response.json() )
//     .then( (json) =>
//       this.setState({
//         inputTitleValue: json.title,
//         textareaBodyValue: json.body,
//         userValue: json.userId
//       })
//     );
// }