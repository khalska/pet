import { combineReducers } from 'redux';
import { postsReducer, posts, postsHasErrored, postsIsLoading, searchedPhrase, filteredPosts } from './posts';

export default combineReducers({
  postsReducer,
  posts,
  postsHasErrored,
  postsIsLoading,
  searchedPhrase,
  filteredPosts
});
