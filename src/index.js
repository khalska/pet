import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import {Provider} from "react-redux";
import configureStore from './store/configureStore';
import getRoutes from './routes';

const initialState = {
  posts: [],
  filteredPosts: [],
  searchedPhrase: '',
  postToDelete: -1
}

const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <div className="container">
      { getRoutes() }
    </div>
  </Provider>
), document.getElementById('root'));
