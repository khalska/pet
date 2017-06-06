import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import classNames from 'classnames';
import { connect } from "react-redux";
import {
  signIn
} from '../../actions/auth';

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isLogged: PropTypes.bool.isRequired,
    login: PropTypes.string
  }
  render() {
    return (
      <div className={classNames('Header page-header')}>
        <Logo src={logo} />
        <h1>{this.props.title} </h1>
      </div>

    );
  }
}
//export default Header;

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    login: state.login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (login) => dispatch(signIn(login))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);