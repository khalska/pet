import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

class User extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className="User">
        <input type="radio" id={`input${this.props.user.name}`} value={this.props.user.id} name="userRadio" /> 
        <label htmlFor={`input${this.props.user.name}`}>{this.props.user.name}</label>
      </div>
    );
  }
}
export default User;
