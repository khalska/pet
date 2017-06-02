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
  getPostComments
} from '../../actions/postPage';

class PostPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    comments: PropTypes.array,
    location: PropTypes.object,

    inputTitleValue: PropTypes.string,
    textareaBodyValue: PropTypes.string,
    userValue: PropTypes.string,
    setBody: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    getPostData: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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
      //this.__getComments(postId);
    }
  }

  handleSubmit() {
    const postId = this.props.params.postId;
    postId ? this.__updatePost(postId) : this.__addNewPost();
  }

  __addNewPost() {
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

  __updatePost(postId) {
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
    this.props.setTitle(event.target.value);
  }

  handleBodyChange(event) {
    this.props.setBody(event.target.value);
  }

  handleUserChange(event) {
    this.props.setUser(event.target.value);
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
    getPostComments: (postId) => dispatch(getPostComments(postId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
