import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { checkIfLogged } from '../../actions/auth';

export function requireAuthentication(Component) {

  class AuthComponent extends React.Component {
    static propTypes = {
      isLogged: PropTypes.bool.isRequired,
      checkIfLogged: PropTypes.func.isRequired
    }

    componentWillMount() {
      this.props.checkIfLogged();
      if (!this.props.isLogged) {
        browserHistory.push('/login');
      }
    }

    render() {
      return (
        this.props.isLogged && <Component  {...this.props} />
      )
    }
  }

  const mapStateToProps =
    (state) => ({
      token: state.token,
      isLogged: state.isLogged
    });

  const mapDispatchToProps = (dispatch) => {
    return {
      checkIfLogged: () => dispatch(checkIfLogged())
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
}
