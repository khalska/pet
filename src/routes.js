import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Page from "./components/Page/Page";
import PostPage from "./components/PostPage/PostPage";
import LoginPage from "./components/LoginPage/LoginPage";

export default () => {
  return (
      <Router history={browserHistory}>
        <Route exact path='/' component={Page}/>
        <Route path='/add-post' component={PostPage}/>
        <Route path='/update-post/:postId' component={PostPage}/>
        <Route path='/login' component={LoginPage}/>
      </Router>
    );
};
