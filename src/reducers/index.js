import { combineReducers } from 'redux';
import { posts, postsHasErrored, postsIsLoading, searchedPhrase, filteredPosts, postToDelete } from './posts';
import { inputTitleValue, textareaBodyValue, userValue, comments } from './postPage';

export default combineReducers({
  posts,
  postsHasErrored,
  postsIsLoading,
  searchedPhrase,
  filteredPosts,
  postToDelete,
  inputTitleValue,
  textareaBodyValue,
  userValue,
  comments
});
