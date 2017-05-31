/*
 * action creators
 */

export function actionIncrement() {
  return { type: 'INCREMENT' }
}



export function actionChangeSearch(searchedPhrase) {
  return { type: 'CHANGE_SEARCH2', searchedPhrase }
}

export function actionGetPosts(posts) {
  return { type: 'GET_POSTS', posts}
}

export function actionFilterPosts() {
  return { type: 'FILTER_POSTS' }
}