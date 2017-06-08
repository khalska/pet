import {config} from "../config";
import { validateLoginForm,
  setLoginFormValidation
} from './validation.js';
export function setIsLogged(bool) {

  return {
    type: 'SET_IS_LOGGED',
    isLogged: bool
  };
}

export function setToken(token) {
  return {
    type: 'SET_TOKEN',
    token
  };
}

export function setUserData(userData) {
  return {
    type: 'SET_USER_DATA',
    userData
  };
}

export function signIn(login, password) {
  return (dispatch) => {
    dispatch(fetchSignIn(login,password));
  }
}

// export function fetchSignIn(login, password) {
//   return (dispatch, getState) => {
//     const data = {
//       login,
//       password
//     }
//
//     const myParams = Object.keys(data).map((key) => {
//       return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
//     }).join('&');
//
//     const fetchData = {
//       method: 'POST',
//       body: myParams,
//       //credentials: 'include',
//       headers: {
//         //"Content-Type": "application/json"
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         'Access-Control-Allow-Origin': 'http://localhost:3003'
//         }
//     }
//
//     const url = config.url.login;
//
//     fetch(url, fetchData)
//       .then((response) => {
//
//         if (!response.ok) {
//           throw Error(response.statusText);
//         }
//         return response;
//       })
//       .then( (response) => response.json() )
//       .then( (json) => {
//         dispatch(setToken(json.token));
//         dispatch(setIsLogged(true));
//         dispatch(fetchUserData(json.token));
//       });
//
//   }
// }

export function fetchSignIn(login, password) {
  return (dispatch, getState) => {

    dispatch(validateLoginForm(login, password));
    const isValid = getState.formLoginIsValid;
    //console.log(`isValid: ${isValid}`)

    if (isValid) {
      const data = {
        login,
        password
      }

      const myParams = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');

      const fetchData = {
        method: 'POST',
        body: myParams,
        //credentials: 'include',
        headers: {
          //"Content-Type": "application/json"
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Access-Control-Allow-Origin': 'http://localhost:3003'
        }
      }

      const url = config.url.login;

      fetch(url, fetchData)
        .then((response) => {

          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((json) => {
          dispatch(setToken(json.token));
          dispatch(setIsLogged(true));
          dispatch(fetchUserData(json.token));
        });
    }
  }
}

export function fetchUserData(token) {
  return (dispatch) => {
    const url = config.url.auth;

    const fetchData = {
      method: 'GET',
      headers: {
        authorization: token,
      },
    }

    fetch(url, fetchData)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserData(json))
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(setToken(''));
    dispatch(setIsLogged(false));
    dispatch(setUserData({}));
  }
}
