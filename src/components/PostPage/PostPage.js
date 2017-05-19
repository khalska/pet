import React from 'react';
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import './PostPage.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import { config } from '../../config.js';

class PostPage extends React.Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      inputTitleValue: '',
      textareaBodyValue: '',
      newData: {}
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
  }

  handleSubmit() {
    this.addNewPost();
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

  handleTitleChange(event) {
    this.setState({inputTitleValue: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({textareaBodyValue: event.target.value});
  }

  renderTitle() {
    const postId = this.props.match.params.postId;
    let title = postId ? ("Edit post #" + postId) : "Add new post";
    return (
      <h3>{title}</h3>
    );
  }

  renderForm() {
    return(
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
