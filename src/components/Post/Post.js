import React from 'react';
import './Post.css';

class Post extends React.Component {
    render() {
        return (
            <li className="Post list-group-item panel row">
                <div className="Post_data col-md-9">
                    <h3>{this.props.postTitle}</h3>
                    <div>{this.props.postContent}</div>
                </div>
                <div className="Post_buttons col-md-3 text-center">
                    <a href={this.props.postSrc} className="btn btn-block btn-sm btn-default">Open</a>
                    <button className="btn btn-block btn-sm btn-default">Delete</button>                   
                </div>
            </li>
        );
        
    }
}
export default Post;