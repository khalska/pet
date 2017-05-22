import React from 'react';
import { Link } from 'react-router-dom'
import './Post.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import { config } from '../../config.js';
import Modal from '../Modal/Modal';

class Post extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        handleDelete: PropTypes.func.isRequired
    }

    constructor(props) {
      super(props)
      this.state = { isModalOpen: false }
    }

    deletePost(postId) {
        const url = `${config.url}/${postId}`;
        fetch(url, {method: 'DELETE'})
        .then();
    }

    render() {
        return (
            <li className={classNames('Post list-group-item panel row')}>
                <div className={classNames('Post_data col-md-9')}>
                    <h3>{this.props.post.title}</h3>
                    <div>{this.props.post.body}</div>
                </div>
                <div className={classNames('Post_buttons col-md-3 text-center')}>
                    <Link to={`update-post/${this.props.post.id}`} className={classNames('btn btn-block btn-sm btn-default')}>
                        Edit
                    </Link>
                    <button onClick={() => this.props.handleDelete()} className={classNames('btn btn-block btn-sm btn-default')}>
                        Delete
                    </button>                   
                </div>               
            </li>
        );
    }
}
export default Post;
