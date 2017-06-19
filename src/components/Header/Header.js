import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import classNames from 'classnames';
import { connect } from "react-redux";
import UserPanel from '../UserPanel/UserPanel';
import { Link } from 'react-router';
import {
  signIn
} from '../../actions/auth';

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isLogged: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className={classNames('Header page-header')}>
        <Link to={'/'}>
          <Logo src={logo} />
          <h1>{this.props.title}</h1>
        </Link>

        <UserPanel />
      </div>
    );
  }
}
//export default Header;

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (login) => dispatch(signIn(login))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);