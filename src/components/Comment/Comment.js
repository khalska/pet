import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Comment.css';

class Comment extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    body: PropTypes.string
  }

  render() {
    return (
      <li className={classNames('Comment list-group-item panel')}>
        <h4>{this.props.name}</h4>
        <div>{this.props.body}</div>
      </li>
    );
  }
}
export default Comment;
