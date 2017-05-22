import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PostPage from '../PostPage/PostPage';
import Page from '../Page/Page';

const Main = () => (
  <main>
    <Router history={browserHistory}>
      <Route exact path='/' component={Page}/>
      <Route path='/add-post' component={PostPage}/>
      <Route path='/update-post/:postId' component={PostPage}/>
    </Router>
  </main>
)

class App extends React.Component {
    renderHeader() {
      return(
        <Header title="Welcome to React" />
      );
    }

    render() {
        return (
            <div className="container">
              {this.renderHeader()}
              <Main />
              <Footer />
            </div>
        );
    }
}
export default App;
