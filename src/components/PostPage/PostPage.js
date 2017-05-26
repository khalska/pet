import React from 'react';
import { Link } from 'react-router'
import './PostPage.css';
import PropTypes from 'prop-types';
import { config } from '../../config.js';
import Comment from '../Comment/Comment';
import User from '../User/User';
import './PostPage.css';
import fetch from 'isomorphic-fetch';
import { IndexLink } from 'react-router'

class PostPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    comments: PropTypes.array,
    location: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      inputTitleValue: '',
      textareaBodyValue: '',
      comments: [],
      userValue: '',
      title: '',
      info: ''
    };
  }

  componentDidMount() {
    const postId = this.props.params.postId;

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
    const postId = this.props.params.postId;
    postId ? this.updatePost(postId) : this.addNewPost();
  }

  addNewPost() {
    const data = {
      title: this.state.inputTitleValue,
      body: this.state.textareaBodyValue,
      userId: this.state.userValue
    }

    const fetchData = { 
      method: 'POST', 
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    fetch(config.url, fetchData)
      .then( (response) => response.json() )   
      .then( (json) => {
        this.setState({info: `Post #${json.id} was saved.`})
        //this.context.router.push(`/update-post/${json.id}`)
      });
  }

  updatePost(postId) {
    const data = {
      id: postId,
      title: this.state.inputTitleValue,
      body: this.state.textareaBodyValue,
      userId: this.state.userValue
    };

    const fetchData = { 
      method: 'PUT', 
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    const url = `${config.url}/${postId}`;

    fetch(url, fetchData)
      .then( (response) => {
        const info = (response.ok) ? 'Changes in post was saved.' : 'Error!'
        this.setState({info})
      });
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
    const postId = this.props.params.postId;
    const title = postId ? (`Edit post #${postId}`) : 'Add new post';
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
            user => <User key={user.id} {...user} />
          )}
        </ul>
      </div>
    );
  }

  renderComments() {
    if (this.props.params.postId) {
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
        <form onSubmit={ () => this.handleSubmit() }>
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
        </form>
          <div className="form_buttons">
            <button onClick={ () => this.handleSubmit() } 
              className={'btn btn-success button_save'}
              disabled={ this.validateForm() } >
              Save changes
            </button>
            <Link to='/' className={'btn btn-default button_cancel'}>
              Cancel
            </Link>
          </div>
      </div>
    );
  }

  renderBreadcrumbs() {
    return(
      <div className="breadcrumbs">
        <ul>
          <li>
            <IndexLink to="/" activeClassName="active">Posts</IndexLink>
          </li> >
          <li>
            <IndexLink to={this.props.location.pathname} activeClassName="active">Post (#{this.props.params.postId})</IndexLink>
          </li>
        </ul>
      </div>
    );
  }

  renderInfo() {
    return (
      <div className={ (this.state.info) ? 'info alert alert-success' : 'info'}>
        {this.state.info}
      </div>
    )
  }

  render() {
    return (
      <div className="PostPage">
        {this.renderBreadcrumbs()}
        {this.renderTitle()}
        {this.renderForm()}
        {this.renderInfo()}
        {this.renderComments()}
      </div>
    );
  }
}
export default PostPage;
