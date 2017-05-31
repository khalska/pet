import { combineReducers } from 'redux';
import { postsReducer, posts, postsHasErrored, postsIsLoading } from './posts';

export default combineReducers({
  postsReducer,
  posts,
  postsHasErrored,
  postsIsLoading,
});
