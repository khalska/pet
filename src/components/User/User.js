import React from 'react';
import './User.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import classNames from 'classnames';

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    myId: PropTypes.node
  }

  render() {
    return (
      <li className={classNames('User', (this.props.id === this.props.myId) ? 'actual' : '')}>
        <input type="radio"
               id={ `input${this.props.id}` }
               value={ this.props.id }
               name="userRadio"

        />
        <label htmlFor={ `input${this.props.id}` }>
          {this.props.firstName} { this.props.lastName }
        </label>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myId: state.userData.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
