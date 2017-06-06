import React from 'react';
import { Link } from 'react-router';
import './Page.css';
import Post from '../Post/Post';
import Modal from '../Modal/Modal';
import Search from '../Search/Search';
import { config } from '../../config.js';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  postsFetchData,
  changeSearchedPhrase,
  getFilteredPosts,
  deletePostAction,
  choosePostToDelete
} from '../../actions/actions';

class Page extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    filteredPosts: PropTypes.array.isRequired,
    searchedPhrase: PropTypes.string,
    postToDelete: PropTypes.number.isRequired,

    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,

    getPosts: PropTypes.func,
    fetchData: PropTypes.func.isRequired,
    changePhrase: PropTypes.func.isRequired,
    getSearchedPosts: PropTypes.func.isRequired,
    setPostToDelete: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,

    isLogged: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  componentDidMount() {
    if (this.props.posts.length === 0) {
      this.props.fetchData(config.url);
    }

  }

  openModal(postId) {
    this.props.setPostToDelete(postId);
    this.setState({ 
      isModalOpen: true
    })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  onConfirmDelete(postId) {
    this.props.deletePost(postId);
    this.closeModal();
  }

  __renderPosts() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }

    return(
      <div className="post-content">
        <ul className="list-group">
          { this.props.filteredPosts.map(
            post => <Post key={post.id} {...post} handleDelete={ () => this.openModal(post.id)}/>
          )}
        </ul>
      </div>
    );
  }

  __renderAddPostButton() {
    return(
      this.props.isLogged &&
      <div className="addPostButton pull-right">
        <Link to="add-post" className={classNames('btn pull-right btn-success')}>
          Add new post
        </Link>
      </div>

    );
  }

  render() {
    const { searchedPhrase, getSearchedPosts, changePhrase } = this.props;

    return (
      <div className={classNames('Page')}>
        {this.__renderAddPostButton()}

        <div>post to delete: {this.props.postToDelete} , number of posts: {this.props.posts.length}</div>

        <br/>

        <Search
          phrase={ searchedPhrase }

          onFilterTextInput={ (e) => debounce(500, changePhrase(e)) }
          onFilterTextButton={ (e) => getSearchedPosts(e) }
        />

        <Modal 
          isOpen={this.state.isModalOpen} 
          onClose={ () => this.closeModal() } 
          onConfirm={ () => this.onConfirmDelete(this.props.postToDelete) }
          buttonCloseLabel="No"
          buttonConfirmLabel="Yes"
        >
          <p>Are you sure to delete post #{this.props.postToDelete}?</p>
        </Modal>

        {this.__renderPosts()}
      </div>
    );
  }
}

//export default Page;

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    filteredPosts: state.filteredPosts,
    searchedPhrase: state.searchedPhrase,
    counter: state.counter,

    hasErrored: state.postsHasErrored,
    isLoading: state.postsIsLoading,
    postToDelete: state.postToDelete,

    isLogged: state.isLogged
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(postsFetchData(url)),
    changePhrase: (phrase) => dispatch(changeSearchedPhrase(phrase)),
    getSearchedPosts: (searchedPhrase) => dispatch(getFilteredPosts(searchedPhrase)),
    deletePost: (postId) => dispatch(deletePostAction(postId)),
    setPostToDelete: (postId) => dispatch(choosePostToDelete(postId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);