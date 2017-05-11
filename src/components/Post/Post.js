import React from 'react';

class Post extends React.Component {
    render() {
        return (
            <li className="post">
                <div className="post_data">
                    <h3>{this.props.postTitle}</h3>
                    <div>{this.props.postContent}</div>
                </div>
                <div className="post_buttons">
                    <a href={this.props.postSrc}>Open</a>
                    <button>Delete</button>
                </div>
                
            </li>
        );
        
    }
}
export default Post;