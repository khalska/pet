import { config } from "../config";
import {
  setInfo
} from './actions.js';

export function setLoginFormValidation(formLoginIsValid, error) {
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
      dispatch(setLoginFormValidation(passwordIsValid));
      result = false;
      errors.push(config.messages.empty_password);
    }
    dispatch(setInfo(errors));
    dispatch(setLoginFormValidation(true));
    return result;
  }
}

export function validateInputText(value) {
  return !(value.length === 0);
}
