import React from 'react';
import { Link } from 'react-router';
import './UserPanel.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from "react-redux";
import {
  fetchUserData
} from '../../actions/auth';

class UserPanel extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    login: PropTypes.string,
    userData: PropTypes.object,
    getUserData: PropTypes.func,

  }

  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
  }

  render() {
    return (
      <div className={ classNames('UserPanel') }>
        <span className={ classNames('glyphicon glyphicon-user') }></span>
        <span> { this.props.userData.firstName } { this.props.userData.lastName } </span>
        <span> ({ this.props.userData.email }) </span>
        <br/>

        <Link to="login" className={classNames('btn btn-success')}>
          Zaloguj
        </Link>

        <Link
          to={''}
          onClick={() => this.props.getUserData()}
          className={classNames('btn btn-default')}>
          Wyloguj
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    login: state.login,
    userData: state.userData
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch(fetchUserData())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
