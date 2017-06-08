export function isLogged(state = false, action) {
  switch (action.type) {
    case 'SET_IS_LOGGED':
      return action.isLogged;

    default:
      return state;
  }
}

export function token(state = '', action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;

    default:
      return state;
  }
}

export function userData(state = {}, action) {
  switch (action.type) {
    case 'SET_USER_DATA':
      return action.userData;

    default:
      return state;
  }
}

export function formLoginIsValid(state = false, action) {
  switch (action.type) {
    case 'SET_LOGIN_FORM_VALID':
      return action.formLoginIsValid;

    default:
      return state;
  }
}

export function info(state = [], action) {
  switch (action.type) {
    case 'SET_INFO':
      return action.info;

    default:
      return state;
  }
}