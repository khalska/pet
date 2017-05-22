import React from 'react';
import { Link } from 'react-router-dom'
import './PostPage.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { config } from '../../config.js';
import Comment from '../Comment/Comment';
import User from '../User/User';
import './PostPage.css';
import fetch from 'isomorphic-fetch';

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
      comments: [],
      userValue: ''
    };
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;

    if (postId) {
      this.getPostData(postId);
      this.getComments(postId);
    }
  }

  getPostData(postId) {
    const url = `${config.url}/${postId}`;
    fetch(url)
      .then( (response) => response.json() )   
      .then( (json) => 
        this.setState({
          inputTitleValue: json.title,
          textareaBodyValue: json.body,
          userValue: json.userId
        })
      );
  }

  getComments(postId) {
    const url = `${config.url}/${postId}/comments`;
    fetch(url)
      .then( (response) => response.json() )   
      .then( (json) => this.setState({comments: json}) );
  }

  handleSubmit() {
    const postId = this.props.match.params.postId;
    postId ? this.updatePost(postId) : this.addNewPost();
  }

  addNewPost() {
    let data = {
      title: this.state.inputTitleValue,
      body: this.state.textareaBodyValue,
      userId: this.state.userValue
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
      userId: this.state.userValue
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

  handleUserChange(event) {
    this.setState({
       userValue: event.target.value
     });
  }

  validateForm() {
    return !(this.state.inputTitleValue && this.state.textareaBodyValue && this.state.userValue)
  }

  renderTitle() {
    const postId = this.props.match.params.postId;
    let title = postId ? ('Edit post #' + postId) : 'Add new post';
    return (
      <h3>{title}</h3>
    );
  }

  renderUsers() {
    return(
      <div className="users_container">
        <h5>User</h5>
        <ul className="panel" onChange={ (e) => this.handleUserChange(e)} >    
          {config.users.map(
            user => <User key={user.id} user={user} />
          )}
        </ul>
      </div>
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
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <div className="form_title_input">
            <input type="text" required className="form-control"
              value={this.state.inputTitleValue} 
              onChange={ (e) => this.handleTitleChange(e) } 
              placeholder="Title" />
          </div>
          <div className="form_body_textarea">
            <textarea required className="form-control"
              value={this.state.textareaBodyValue} 
              onChange={ (e) => this.handleBodyChange(e) } 
              placeholder="Body" />
          </div>
          {this.renderUsers()}
          <div className="form_buttons">
            <input type="submit" value="Save changes" 
              disabled={ this.validateForm() } 
              className={'btn btn-success button_save'}/>
            <Link to='/' className={'btn btn-default button_cancel'}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="PostPage">
        {this.renderTitle()}
        {this.renderForm()}
        {this.renderComments()}
      </div>
    );
  }
}
export default PostPage;
