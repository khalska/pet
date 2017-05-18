import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';
import PostPage from '../PostPage/PostPage';
import Page from '../Page/Page';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Page}/>
      <Route path='/add-post' component={PostPage}/>
      <Route path='/update-post/:postId' component={PostPage}/>
    </Switch>
  </main>
)

class App extends React.Component {
    renderHeader() {
      return(
        <div className="page-header">
          <Logo src={logo} />
          <Header title="Welcome to React" />
        </div>
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
