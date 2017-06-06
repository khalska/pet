import React from 'react';
import { Link } from 'react-router';
import './UserPanel.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from "react-redux";
import {
  logOut
} from '../../actions/auth';

class UserPanel extends React.Component {
  static propTypes = {
    isLogged: PropTypes.bool.isRequired,
    userData: PropTypes.object,
    logOut: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
  }

  __renderUserData() {
    return(
      <div>
        <span className={ classNames('glyphicon glyphicon-user') }></span>
        <span> { this.props.userData.firstName } { this.props.userData.lastName } </span>
        <span> ({ this.props.userData.email }) </span>
        <br/>

        <Link
          to={''}
          onClick={() => this.props.logOut()}
          className={classNames('btn btn-default')}>
          Log out
        </Link>
      </div>
    )
  }

  render() {
    return (
      <div className={ classNames('UserPanel text-right') }>
        {
          this.props.isLogged &&
          this.__renderUserData()
        }
        { !this.props.isLogged &&
          <Link to="login" className={classNames('btn btn-success')}>
            Log in
          </Link>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    userData: state.userData
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
