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
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  actionIncrement,
  actionChangeSearch,
  actionGetPosts
} from '../../actions/actions';

class Page extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    filteredPosts: PropTypes.array.isRequired,
    searchedPhrase: PropTypes.string,

    counter: PropTypes.Number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,

    onChangeSearch: PropTypes.func,
    getPosts: PropTypes.func
  }

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

  handleFilterTextButton() {
    const phrase = this.state.phrase.toLowerCase();
    let filteredPosts = this.state.posts;

    filteredPosts = filteredPosts.filter( (post) => {
      if (post.hasOwnProperty('title') && post.hasOwnProperty('body')) {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();
        return (title.indexOf(phrase) >= 0 || body.indexOf(phrase) >= 0);
      } 
    });

    this.setState({
      filteredPosts
    });
  }

  componentDidMount() {
    this.__getPosts();
  }

  __getPosts() {
    fetch(config.url)
      .then( (response) => response.json() )
      .then( (json) =>
        this.props.getPosts(json)
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
    .then(this.deletePostLocally(postId));
  }

  deletePostLocally(postId) {
    let posts = this.state.posts;

    posts.forEach((item, index) => {
      if (item.id === postId) {
        posts.splice(index,1);
      }
    });

    this.setState({
      posts
    })
  }

  __renderPosts() {
    return(
      <div className="post-content">
        <ul className="list-group">
          {/*{ this.state.filteredPosts.map(*/}
            {/*post => <Post key={post.id} {...post} handleDelete={ () => this.openModal(post.id)}/>*/}
          {/*)}*/}
          { this.props.filteredPosts.map(
            post => <Post key={post.id} {...post} handleDelete={ () => this.openModal(post.id)}/>
          )}
        </ul>
      </div>
    );
  }

  __renderAddPostButton() {
    return(
      <div className="addPostButton pull-right">
        <Link to="add-post" className={classNames('btn pull-right btn-success')}>
          Add new post 
        </Link>
      </div>
    );
  }

  render() {
    const { counter, onDecrement, onIncrement, onChangeSearch, searchedPhrase } = this.props;

    return (
      <div className={classNames('Page')}>
        {this.__renderAddPostButton()}
        {}
        <div>
          <div>{counter}</div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>

        { searchedPhrase }
        <Search
          phrase={ searchedPhrase }
          onFilterTextInput={ (e) => debounce(500, onChangeSearch(e)) }
          onFilterTextButton={ (e) => this.handleFilterTextButton(e) }
        />

        <Modal 
          isOpen={this.state.isModalOpen} 
          onClose={ () => this.closeModal() } 
          onConfirm={ () => this.onConfirmDelete(this.state.postToDelete) }
          buttonCloseLabel="No"
          buttonConfirmLabel="Yes"
        >
          <p>Are you sure to delete post #{this.state.postToDelete}?</p>
        </Modal>

        {this.__renderPosts()}
      </div>
    );
  }
}

//export default Page;

function mapStateToProps(state) {
  return {
    posts: state.posts,
    filteredPosts: state.filteredPosts,
    searchedPhrase: state.searchedPhrase,
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(actionIncrement()),
    onDecrement: () => dispatch({ type: 'DECREMENT' }),
    onChangeSearch: (a) => dispatch(actionChangeSearch(a)),
    getPosts: (a) => dispatch(actionGetPosts(a))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);