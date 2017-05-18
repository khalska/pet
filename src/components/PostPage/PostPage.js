import React from 'react';
import './PostPage.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitleValue: '',
      textareaBodyValue: ''
    };
  }

  handleSubmit(event) {
    alert('Submit');
    event.preventDefault();
  }

  handleTitleChange(event) {
    this.setState({inputTitleValue: event.target.value});
  }

  render() {
    return (
      <div>
        <h3>Edit/Insert post</h3>
        <form onSubmit={this.handleSumbit}>
          <label>
            Title:
            <input type="text" value={this.state.inputTitleValue} onChange={this.handleTitleChange} />
          </label>
          <input type="submit" value="Save changes" />
        </form>
      </div>
    );
  }
}
export default PostPage;

PostPage.propTypes = {
    
}
