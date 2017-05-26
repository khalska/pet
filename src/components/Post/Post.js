import React from 'react';
import { Link } from 'react-router';
import './Post.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Post extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    handleDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
  }

  render() {
    return (
      <li className={classNames('Post list-group-item panel row')}>
        <div className={classNames('Post_data col-md-10')}>
          <h3>{this.props.title}</h3>
          <div>{this.props.body}</div>
        </div>
        <div className={classNames('Post_buttons col-md-2 text-center')}>
          <Link
            to={`update-post/${this.props.id}`}
            className={classNames('btn btn-block btn-default')}>
            Edit
          </Link>
          <button
            onClick={() => this.props.handleDelete()}
            className={classNames('btn btn-block btn-default')}>
            Delete
          </button>
        </div>
      </li>
    );
  }
}
export default Post;
