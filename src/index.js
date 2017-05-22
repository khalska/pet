import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import './style/index.css';

/*ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Page}/>
      <Route path='/add-post' component={PostPage}/>
      <Route path='/update-post/:postId' component={PostPage}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));*/

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
