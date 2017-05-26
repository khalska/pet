import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

class User extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired
  }

  render() {
    return (
      <li className="User">
        <input type="radio" id={`input${this.props.name}`} value={this.props.id} name="userRadio" /> 
        <label htmlFor={`input${this.props.name}`}>{this.props.name}</label>
      </li>
    );
  }
}
export default User;
