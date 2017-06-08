import { config } from "../config";
import {
  setInfo
} from './actions.js';

export function setLoginFormValidation(formLoginIsValid) {
  return {
    type: 'SET_LOGIN_FORM_VALID',
    formLoginIsValid
  }
}

export function validateLoginForm(login, password) {
  return (dispatch) => {
    const errors = [];
    let result = true;

    const loginIsValid = validateInputText(login);
    if (!loginIsValid) {
      result = false;
      errors.push(config.messages.empty_login);
    }

    const passwordIsValid = validateInputText(password);
    if (!passwordIsValid) {
      result = false;
      errors.push(config.messages.empty_password);
    }
    dispatch(setInfo(errors));
    dispatch(setLoginFormValidation(result));

    return result;
  }
}

export function setPostFormValidation(formPostIsValid) {
  return {
    type: 'SET_POST_FORM_VALID',
    formPostIsValid
  }
}

export function validateNewPostForm() {
  return (dispatch, getState) => {
    const errors = [];
    let result = true;

    const titleIsValid = validateInputText(getState().inputTitleValue);
    if (!titleIsValid) {
      result = false;
      errors.push(config.messages.empty_title);
    }

    const bodyIsValid = validateInputText(getState().textareaBodyValue);
    if (!bodyIsValid) {
      result = false;
      errors.push(config.messages.empty_body);
    }

    // const userIsValid = validateInputText(getState().userValue)
    dispatch(setInfo(errors));
    dispatch(setPostFormValidation(result));

    return result;
  }
}

export function validateInputText(value) {
  return !(value.length === 0);
}
