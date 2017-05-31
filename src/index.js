import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './style/index.css';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import configureStore from './store/configureStore';


const initialState = {
  counter: 0,
  posts: [],
  filteredPosts: []
}

const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <div>

    <App />
    </div>
  </Provider>
), document.getElementById('root'));
