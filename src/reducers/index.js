import { combineReducers } from 'redux';
import { posts, postsHasErrored, postsIsLoading, searchedPhrase, filteredPosts, postToDelete } from './posts';
import { inputTitleValue, textareaBodyValue, userValue, comments, lastPostId } from './postPage';
import { isLogged, login, token, userData } from './auth';

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
  comments,
  lastPostId,

  isLogged,
  login,
  token,
  userData
});
