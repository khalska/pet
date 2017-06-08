const baseApiUrl = 'http://localhost:3003';

export const config = {
  url: {
    posts: `${baseApiUrl}/posts`,
    users: `${baseApiUrl}/authors`,
    login: `${baseApiUrl}/auth/login`,
    auth:  `${baseApiUrl}/auth/me`
  },
  messages: {
    empty_login: 'Login is empty',
    empty_password: 'Password is empty'
  }
};