import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import classNames from 'classnames';

class Header extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
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
export default Header;
