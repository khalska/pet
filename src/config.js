const baseApiUrl = 'http://localhost:3003';

export const config = {
  url: {
    posts: `${baseApiUrl}/posts`,
    users: `${baseApiUrl}/authors`,
    login: `${baseApiUrl}/auth/login`,
    auth:  `${baseApiUrl}/auth/me`
  },
  users: [
    {
      id: 0,
      name: 'User 1'
    },{
      id: 1,
      name: 'User 2'
    },{
      id: 2,
      name: 'User 3'
    }
  ]
};