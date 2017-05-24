import React from 'react';
import { Link } from 'react-router';
import './Page.css';
import Post from '../Post/Post';
import Modal from '../Modal/Modal';
import Search from '../Search/Search';
import { config } from '../../config.js';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch';
import { debounce } from 'throttle-debounce';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filteredPosts: [],
      phrase: '',
      isModalOpen: false,
      postToDelete: 0
    };
  }

  handleFilterTextInput(phrase) {
    this.setState({
      phrase: phrase
    });
  }

  handleFilterTextButton() {
    const phrase = this.state.phrase.toLowerCase();
    let result = this.state.posts;
    
    result = result.filter(function (post) {
      if (post.hasOwnProperty('title') && post.hasOwnProperty('body')) {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();
        return (title.indexOf(phrase) >= 0 || body.indexOf(phrase) >= 0);
      } 
    });

    this.setState({
      filteredPosts: result
    }); 
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch(config.url)
      .then( (response) => response.json() )   
      .then( (json) =>  
        this.setState({
          posts: json, 
          filteredPosts: json
        }) 
      );
  }

  openModal(postId) {
    this.setState({ 
      isModalOpen: true,
      postToDelete: postId
    })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  onConfirmDelete(postId) {
    this.deletePost(postId);
    this.closeModal();
  }

  deletePost(postId) {
    const url = `${config.url}/${postId}`;
    fetch(url, {method: 'DELETE'})
    .then();
    this.getPosts();
  }

  renderPosts() {
    return(
      <div className="post-content">
        <ul className="list-group">
          { this.state.filteredPosts.map(
            post => <Post key={post.id} {...post} handleDelete={ () => this.openModal(post.id)}/>
          )}
        </ul>
      </div>
    );
  }

  renderAddPostButton() {
    return(
      <div className="addPostButton pull-right">
        <Link to="add-post" className={classNames('btn pull-right btn-success')}>
          Add new post 
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className={classNames('Page')}>
        {this.renderAddPostButton()}

        <Search 
          phrase={this.state.phrase.toLowerCase()}
          onFilterTextInput={ (e) => debounce(500, this.handleFilterTextInput(e)) }
          onFilterTextButton={ (e) => this.handleFilterTextButton(e) }
        />
      
        <Modal 
          isOpen={this.state.isModalOpen} 
          onClose={ () => this.closeModal() } 
          onConfirm={ () => this.onConfirmDelete(this.state.postToDelete) } >
          <p>Are you sure to delete post #{this.state.postToDelete}?</p>
        </Modal>

        {this.renderPosts()}
      </div>
    );
  }
}

export default Page;
