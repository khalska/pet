export function setIsLogged(isLogged) {
  return {
    type: 'SET_IS_LOGING',
    isLogged
  };
}

export function setLogin(login) {
  return {
    type: 'SET_LOGIN',
    login
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

export function fetchSignIn(login, password) {
  return (dispatch, getState) => {
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

    const url = 'http://localhost:3003/auth/login';

    fetch(url, fetchData)
      .then((response) => {

        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then( (response) => response.json() )
      .then( (json) => {
        dispatch(setToken(json.token));
        dispatch(setIsLogged(true));
        dispatch(setLogin(login));
        dispatch(fetchUserData(json.token))
      });

  }
}

export function fetchUserData(token) {
  return (dispatch) => {
    const url = 'http://localhost:3003/auth/me';

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
//         dispatch(setPosts(posts))
//         dispatch(postsFilter(posts))
//         dispatch({ type: 'SET_LAST_POST_ID', lastPostId: 100 })
//       })
//       .catch(() => dispatch(postsHasErrored(true)));
//   };
// }