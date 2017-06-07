import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

export function requireAuthentication(Component) {

  class AuthComponent extends React.Component {
    static propTypes = {
      isLogged: PropTypes.bool.isRequired,
    }

    componentWillMount() {
      if (!this.props.isLogged) {
        browserHistory.push('/login');
      }
    }

    render() {
      return (
        <Component  {...this.props} />
      )
    }
  }

  const mapStateToProps =
    (state) => ({
      token: state.token,
      isLogged: state.isLogged
    });

  return connect(mapStateToProps)(AuthComponent);
}

