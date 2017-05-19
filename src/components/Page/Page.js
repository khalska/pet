import React from 'react';
import { Link } from 'react-router-dom'
import './Page.css';
import Post from '../Post/Post';
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
      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();
      return ((title.indexOf(phrase) >= 0 || body.indexOf(phrase) >= 0) ? true : false);
    });

    this.setState({
      filteredPosts: result
    }); 
  }

  componentDidMount() {
    fetch(config.url)
      .then( (response) => response.json() )   
      .then( (json) =>  
        this.setState({
          posts: json, 
          filteredPosts: json
        }) 
      );
  }


  renderPosts() {
    return(
      <div className="post-content">
        <ul className="list-group">
          { this.state.filteredPosts.map(
            post => <Post key={post.id} postTitle={post.title} postContent={post.body} postSrc={'update-post/' + post.id} postId={post.id}/>
          )}
        </ul>
      </div>
    );
  }

  renderAddPostButton() {
    return(
      <div className="addPostButton pull-right">
        <Link to="add-post" className={classNames('btn pull-right btn-sm btn-default')}>
          Add new post
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className={classNames('Page')}>
        {this.renderAddPostButton()}

        <Search 
          phrase={this.state.phrase}
          onFilterTextInput={ (e) => this.handleFilterTextInput(e) }
          onFilterTextButton={ (e) => this.handleFilterTextButton(e) }
        />

        {this.renderPosts()}
      </div>
    );
  }
}

export default Page;
