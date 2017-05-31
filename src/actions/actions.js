/*
 * action creators
 */

export function actionIncrement() {
  return { type: 'INCREMENT' }
}



export function actionChangeSearch(searchedPhrase) {
  return { type: 'CHANGE_SEARCH2', searchedPhrase }
}

export function actionFilterPosts(filteredPosts) {
  return { type: 'FILTER_POSTS', filteredPosts }
}

export function actionGetPosts(posts) {
  return { type: 'GET_POSTS', posts}
}