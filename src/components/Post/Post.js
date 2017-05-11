import React from 'react';
import './Post.css';

class Post extends React.Component {
    render() {
        return (
            <li className="Post">
                <div className="Post_data">
                    <h3>{this.props.postTitle}</h3>
                    <div>{this.props.postContent}</div>
                </div>
                <div className="Post_buttons">
                    <a href={this.props.postSrc}>Open</a>
                    <button>Delete</button>
                </div>
                
            </li>
        );
        
    }
}
export default Post;