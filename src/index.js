import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory} from 'react-router';
import App from './components/App/App';
import './style/index.css';

ReactDOM.render((
    <App />
), document.getElementById('root'));
