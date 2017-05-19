import React from 'react';
import { Link } from 'react-router-dom'
import './PostPage.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import { config } from '../../config.js';
import Comment from '../Comment/Comment';
import './PostPage.css';

class PostPage extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    comments: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      inputTitleValue: '',
      textareaBodyValue: '',
      comments: []
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const url = `${config.url}/${postId}/comments`;

    if (postId) {
      fetch(url)
      .then( (response) => {
        return response.json() })   
          .then( (json) => {
            this.setState({comments: json});
          });
    }
  }

  handleSubmit() {
    const postId = this.props.match.params.postId;
    postId ? this.updatePost(postId) : this.addNewPost();
  }

  addNewPost() {
    let data = {
      title: this.state.inputTitleValue,
      body: this.state.textareaBodyValue,
      userId: 1
    }

    let fetchData = { 
      method: 'POST', 
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch(config.url, fetchData)
    .then(response => (response.ok ? response : null));
  }

  updatePost(postId) {
    let data = {
      id: postId,
      title: this.state.inputTitleValue,
      body: this.state.textareaBodyValue,
      userId: 1
    }

    let fetchData = { 
      method: 'PUT', 
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    const url = `${config.url}/${postId}`;

    fetch(url, fetchData)
    .then(response => (response.ok ? response : null));
  }

  handleTitleChange(event) {
    this.setState({inputTitleValue: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({textareaBodyValue: event.target.value});
  }

  renderTitle() {
    const postId = this.props.match.params.postId;
    let title = postId ? ('Edit post #' + postId) : 'Add new post';
    return (
      <h3>{title}</h3>
    );
  }

  renderComments() {
    if (this.props.match.params.postId) {
      return(
        <div className="comments_container">
          <h4>Comments</h4>
          <ul>
            {this.state.comments.map(
              comment => <Comment key={comment.id} name={comment.name} body={comment.body}/>
            )}
          </ul>
        </div>
      );
    }
  }

  renderForm() {
    return(
      <div>
        <form onSubmit={this.handleSumbit}>
          <div>
            <input type="text" value={this.state.inputTitleValue} onChange={this.handleTitleChange} placeholder="Title"/>
          </div>
          <div>
            <textarea value={this.state.textareaBodyValue} onChange={this.handleBodyChange} placeholder="Body" />
          </div>
          <div>
            <input type="submit" value="Save changes" />
            <Link to='/' >
              Cancel
            </Link>
          </div>
        </form>
        {this.renderComments()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderForm()}
        
      </div>
    );
  }
}
export default PostPage;
