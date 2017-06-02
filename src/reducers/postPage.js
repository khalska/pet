/**
 * Created by katarzynapacocha on 02/06/2017.
 */

export function inputTitleValue(state = '', action) {
  switch (action.type) {
    case 'SET_POST_TITLE':
      return action.title;

    default:
      return state;
  }
}

export function textareaBodyValue(state = '', action) {
  switch (action.type) {
    case 'SET_POST_BODY':
      return action.body;

    default:
      return state;
  }
}

export function userValue(state = -1, action) {
  switch (action.type) {
    case 'SET_POST_USER':
      return action.user;

    default:
      return state;
  }
}

export function comments(state = [], action) {
  switch (action.type) {
    case 'SET_POST_COMMENTS':
      return action.comments;

    default:
      return state;
  }
}