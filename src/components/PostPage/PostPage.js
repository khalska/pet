import React from 'react';
import { Link } from 'react-router'
import './PostPage.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import User from '../User/User';
import './PostPage.css';
import { IndexLink } from 'react-router'
import {connect} from "react-redux";
import {
  setPostTitle,
  setPostBody,
  setPostUser,
  getPostData,
  getPostComments,
  addPost,
  updatePost,
  fetchUsers
} from '../../actions/postPage';
import Layout from "../Layout/Layout";
import Info from "../Info/Info";

class PostPage extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    comments: PropTypes.array,
    location: PropTypes.object,

    inputTitleValue: PropTypes.string,
    textareaBodyValue: PropTypes.string,
    userValue: PropTypes.number,
    setBody: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    getPostData: PropTypes.func.isRequired,
    getPostComments: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    formPostIsValid: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  componentDidMount() {
    const postId = this.props.params.postId;
    this.props.getUsers();

    if (postId) {
      this.props.getPostData(postId);
      this.props.getPostComments(postId);
    } else {
      this.clearForm();
    }
  }

  clearForm() {
    this.props.setTitle('');
    this.props.setBody('');
    this.props.setUser(null);
  }

  handleSubmit() {
    const postId = Number(this.props.params.postId);
    postId ? this.props.updatePost(postId) : this.props.addPost();
  }

  handleTitleChange(event) {
    this.props.setTitle(event.target.value);
  }

  handleBodyChange(event) {
    this.props.setBody(event.target.value);
  }

  handleUserChange(event) {
    this.props.setUser(Number(event.target.value));
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
          {this.props.users.map(
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

        {
          !this.formPostIsValid &&
            <Info />
        }

        <div className="form_buttons">
          <button onClick={ () => this.handleSubmit() }
            className={'btn btn-success button_save'}>
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

  render() {
    return (
      <Layout>
        <div className="PostPage">
          {this.__renderBreadcrumbs()}
          {this.__renderTitle()}
          {this.__renderForm()}
          {this.__renderComments()}
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inputTitleValue: state.inputTitleValue,
    textareaBodyValue: state.textareaBodyValue,
    userValue: state.userValue,
    comments: state.comments,
    users: state.users,
    formPostIsValid: state.formPostIsValid
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
    updatePost: (postId) => dispatch(updatePost(postId)),
    getUsers: () => dispatch(fetchUsers())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage);
