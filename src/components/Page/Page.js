import React from 'react';
import logo from './logo.svg';
import './Page.css';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import { config } from '../../config.js';
import classNames from 'classnames';
import fetch from 'isomorphic-fetch'

class Page extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        posts: [],
        filteredPosts: [],
        phrase: ''
      };
  }

  handleFilterTextInput(phrase) {
    this.setState({
      phrase: phrase
    });
  }

  handleFilterTextButton() {
    const phrase = this.state.phrase.toLowerCase();
    let result = this.state.posts;
    
    result = result.filter(function (post) {
      let title = post.title.toLowerCase();
      let body = post.body.toLowerCase();
      return ((title.indexOf(phrase) >= 0 || body.indexOf(phrase) >= 0) ? true : false);
    });

    this.setState({
      filteredPosts: result
    }); 
  }

  componentDidMount() {
    fetch(config.url)
      .then( (response) => {
        return response.json() })   
          .then( (json) => {
            this.setState({posts: json, filteredPosts: json});
          });
  }

  renderHeader() {
    return(
      <div className="page-header">
        <Logo src={logo} />
        <Header title="Welcome to React" />
      </div>
    );
  }

  renderPosts() {
    return(
      <div className="post-content">
        <ul className="list-group">
          { this.state.filteredPosts.map(
            post => <Post key={post.id} postTitle={post.title} postContent={post.body} postSrc="#"/>
          )}
        </ul>
      </div>
    );
  }

  render() {
    
    return (
      <div className={classNames('Page', 'container')}>
        {this.renderHeader()}
        
        <Search 
          phrase={this.state.phrase}
          onFilterTextInput={ (e) => this.handleFilterTextInput(e) }
          onFilterTextButton={ (e) => this.handleFilterTextButton(e) }
        />

        {this.renderPosts()}

        <Footer />
      </div>
    );
  }
}

export default Page;