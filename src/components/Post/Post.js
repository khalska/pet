import React from 'react';
import { Link } from 'react-router-dom'
import './Post.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Post extends React.Component {
    render() {
        return (
            <li className={classNames('Post', 'list-group-item', 'panel', 'row')}>
                <div className={classNames('Post_data', 'col-md-9')}>
                    <h3>{this.props.postTitle}</h3>
                    <div>{this.props.postContent}</div>
                </div>
                <div className={classNames('Post_buttons', 'col-md-3', 'text-center')}>
                    <Link to={this.props.postSrc} className={classNames('btn', 'btn-block', 'btn-sm', 'btn-default')}>
                        Edit
                    </Link>
                    <button className={classNames('btn', 'btn-block', 'btn-sm', 'btn-default')}>
                        Delete
                    </button>                   
                </div>
            </li>
        );
    }
}
export default Post;

Post.propTypes = {
    postTitle: PropTypes.string,
    postContent: PropTypes.string,
    postSrc: PropTypes.string
}
