import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './LoginPage.css';
import { connect } from "react-redux";
import {
  signIn
} from '../../actions/auth';
import {
  validateLoginForm
} from '../../actions/validation';
import Layout from "../Layout/Layout";
import Info from "../Info/Info";


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
    signIn: PropTypes.func.isRequired,
    validateForm: PropTypes.func.isRequired,
    formLoginIsValid: PropTypes.bool.isRequired,
    info: PropTypes.array
  }

  onHandleButton() {
    // this.props.signIn(this.state.login, this.state.password);
    this.props.signIn('piercesantiago@qualitern.com', 'brigitte');
  }

  render() {
    return (
      <Layout>
        <div className={classNames('LoginPage text-center')}>
          <h4> Log in </h4>
          <input type="text" name="myLoginReact" autoComplete="on"
                 placeholder="Enter your login (email)" className="form-control"
                 onChange={ (event) => this.setState({ login: event.target.value }) }
          />

          <input type="password" className="form-control"
                 placeholder="Enter your password"
                 onChange={ (event) => this.setState({ password: event.target.value }) }
          />

          <Info />

          <button className={classNames('btn btn-block btn-success')}
                  onClick={ () => this.onHandleButton() }>Sign in
          </button>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    login: state.login,
    formLoginIsValid: state.formLoginIsValid,
    info: state.info
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (login, password) => dispatch(signIn(login, password)),
    validateForm: (login, password) => dispatch(validateLoginForm(login, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
