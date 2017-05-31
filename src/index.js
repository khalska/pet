import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './style/index.css';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import reducer from './reducers';

let store = createStore(reducer,
  {
    counter: 0,
    posts: [{
      "userId": 2,
      "id": 15,
      "title": "eveniet",
      "body": "itae"
    }],
    filteredPosts: [{
      "userId": 2,
      "id": 15,
      "title": "eveniet",
      "body": "itae"
    }]
  });

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
