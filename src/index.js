import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './components/Page/Page';
import PostPage from './components/PostPage/PostPage';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Page}/>
      <Route path='/add-post' component={PostPage}/>
      <Route path='/update-post/:postId' component={PostPage}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
