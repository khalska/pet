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
import {connect} from "react-redux";
import {
  setPostTitle,
  setPostBody,
  setPostUser,
  getPostData,
  getPostComments,
  addPost,
  updatePost
} from '../../actions/postPage';

class PostPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    comments: PropTypes.array,
    location: PropTypes.object,

    inputTitleValue: PropTypes.string,
    textareaBodyValue: PropTypes.string,
   // userValue: PropTypes.number,
    setBody: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    getPostData: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      info: ''
    };
  }

  componentDidMount() {
    const postId = this.props.params.postId;

    if (postId) {
      this.props.getPostData(postId);
      this.props.getPostComments(postId);
    } else {
      this.clearForm();
    }
  }

  clearForm() {
    this.setTitle('');
    this.setBody('');
    this.setUser('');
  }

  handleSubmit() {
    const postId = this.props.params.postId;
    postId ? this.props.updatePost(postId) : this.props.addPost();
  }

  handleTitleChange(event) {
    this.setTitle(event.target.value);
  }

  handleBodyChange(event) {
    this.setBody(event.target.value);
  }

  handleUserChange(event) {
    this.setUser(event.target.value);
  }

  __validateForm() {
    return !(this.props.inputTitleValue && this.props.textareaBodyValue && this.props.userValue)
  }

  __renderTitle() {
    const postId = this.props.params.postId;
    const title = postId ? (`Edit post #${postId}`) : 'Add new post';
    return (
      <h3>{title}</h3> 
    );
  }

  __renderUsers() {
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

  __renderComments() {
    if (this.props.params.postId) {
      return(
        <div className="comments_container">
          <h4>Comments</h4>
          <ul>
            {this.props.comments.map(
              comment => <Comment key={comment.id} {...comment} />
            )}
          </ul>
        </div>
      );
    }
  }

  __renderForm() {
    return(
      <div>
        <form onSubmit={ () => this.handleSubmit() }>
          <div className="form_title_input">
             <input type="text" required className="form-control"
              value={this.props.inputTitleValue}
              onChange={ (e) => this.handleTitleChange(e) } 
              placeholder="Title" />
          </div>
          <div className="form_body_textarea">
            <textarea required className="form-control"
              value={this.props.textareaBodyValue}
              onChange={ (e) => this.handleBodyChange(e) } 
              placeholder="Body" />
          </div>
          {this.__renderUsers()}
        </form>
          <div className="form_buttons">
            <button onClick={ () => this.handleSubmit() } 
              className={'btn btn-success button_save'}
              disabled={ this.__validateForm() } >
              Save changes
            </button>
            <Link to='/' className={'btn btn-default button_cancel'}>
              Cancel
            </Link>
          </div>
      </div>
    );
  }

  __renderBreadcrumbs() {
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

  __renderInfo() {
    return (
      <div className={ (this.state.info) ? 'info alert alert-success' : 'info'}>
        {this.state.info}
      </div>
    )
  }

  render() {
    return (
      <div className="PostPage">
        {this.__renderBreadcrumbs()}
        {this.__renderTitle()}
        {this.__renderForm()}
        {this.__renderInfo()}
        {this.__renderComments()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inputTitleValue: state.inputTitleValue,
    textareaBodyValue: state.textareaBodyValue,
    userValue: state.userValue,
    comments: state.comments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTitle: (title) => dispatch(setPostTitle(title)),
    setBody: (body) => dispatch(setPostBody(body)),
    setUser: (user) => dispatch(setPostUser(user)),
    getPostData: (postId) => dispatch(getPostData(postId)),
    getPostComments: (postId) => dispatch(getPostComments(postId)),
    addPost: () => dispatch(addPost()),
    updatePost: (postId) => dispatch(updatePost(postId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
