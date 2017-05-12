import React from 'react';
import logo from './logo.svg';
import './Page.css';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
var classNames = require('classnames');

class Page extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        posts: [],
        filteredPosts: [],
        phrase: ''
      };

      this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
      this.handleFilterTextButton = this.handleFilterTextButton.bind(this);
  }

  handleFilterTextInput(phrase) {
    this.setState({
      phrase: phrase
    });
  }

  handleFilterTextButton() {
    var phrase = this.state.phrase;
    var result = this.state.posts;
    
    var result = result.filter(function (post) {
      if(post.title.toLowerCase().indexOf(phrase.toLowerCase()) >= 0) {
        return true
      } else {
        return false;
      }
    });

    this.setState({
      filteredPosts: result
    }); 
  }

  componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/posts")
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({posts: json});
                        this.setState({filteredPosts: json});
                    });
  }

  render() {
    
    return (
      <div className={classNames('Page', 'container')}>
        <div className="page-header">
          
          <Logo src={logo} />
          <Header title="Welcome to React" />
          
        </div>
        <div>{this.state.phrase}</div>
        <Search 
          phrase={this.state.phrase}
          onFilterTextInput={this.handleFilterTextInput}
          onFilterTextButton={this.handleFilterTextButton}
        />
     
        <div className="post-content">
          <ul className="list-group">
            { this.state.filteredPosts.map(
              post=> { return <Post key={post.id} postTitle={post.title} postContent={post.body} postSrc="#"/> }
              )}
          </ul>
        </div>

        <Footer />
				
      </div>
    );
  }
}

export default Page;