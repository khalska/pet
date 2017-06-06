import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LoginPage.css';
import { connect } from "react-redux";
import {
  signIn
} from '../../actions/auth';
import { browserHistory } from 'react-router';
import Layout from "../Layout/Layout";


class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      login: '',
      password: ''
    }
  }

  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    login: PropTypes.string
  }

  onHandleButton() {
    console.log('a')
    this.props.signIn('luannhayes@qualitern.com', 'lesa');
    // this.props.signIn(this.state.login, this.state.password);
    browserHistory.push('/');
  }

  render() {
    return (
      <Layout>
        <div className={classNames('LoginPage text-center')}>
          <h4> Log in </h4>
          <input type="text" name="myLoginReact" autoComplete="on"
            placeholder="Enter your login" className="form-control"
            onChange={ (event) => this.setState({ login: event.target.value }) }
          />

          <input type="password" className="form-control"
            placeholder="Enter your password"
            onChange={ (event) => this.setState({ password: event.target.value }) }
          />

          <button className={classNames('btn btn-block btn-success')}
            onClick={ () => this.onHandleButton() }>Sign in
          </button>
          </div>
      </Layout>
    );
  }
}
//export default LoginPage;

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    login: state.login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (login, password) => dispatch(signIn(login, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
