import { combineReducers } from 'redux';
import { posts, postsHasErrored, postsIsLoading, searchedPhrase, filteredPosts, postToDelete } from './posts';
import { inputTitleValue, textareaBodyValue, userValue, comments, lastPostId, users } from './postPage';
import { isLogged, token, userData, formLoginIsValid, info } from './auth';

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
  token,
  userData,
  users,

  formLoginIsValid,
  info
});
