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

export function lastPostId(state = -1, action) {
  switch (action.type) {
    case 'INCREMENT_LAST_POST_ID':
      return  state + 1;

    case 'SET_LAST_POST_ID':
      return  action.lastPostId;

    default:
      return state;
  }
}

export function users(state = [], action) {
  switch (action.type) {
    case 'SET_USERS':
      return  action.users;

    default:
      return state;
  }
}

export function formPostIsValid(state = false, action) {
  switch (action.type) {
    case 'SET_POST_FORM_VALID':
      return action.formPostIsValid;

    default:
      return state;
  }
}
