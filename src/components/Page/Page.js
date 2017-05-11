import React from 'react';
import logo from './logo.svg';
import './Page.css';
import Header from '../Header/Header';
import Logo from '../Logo/Logo';
import Post from '../Post/Post';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';

class Page extends React.Component {
  constructor() {
      super();
      this.state = { 
        posts: [],
        filteredPosts: []
      };
  }

  componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/posts")
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
                        this.setState({posts: json});
                    });
  }

  filterList(event){
      // var updatedList = this.state.posts;
      
      // updatedList = updatedList.filter(function(item){
      //     return item.toLowerCase().search(
      //     event.target.value.toLowerCase()) !== -1;
      // });
      
      // this.setState({posts: updatedList});
  }

  render() {
    return (
      <div className="Page container">
        <div className="page-header">
          
          <Logo src={logo} />
          <Header title="Welcome to React" />
          
        </div>

        <Search posts={this.state.posts} onChange={this.filterList}/>
        {/*<input type="text" placeholder="Search" onChange={this.filterList}/>*/}

        <div className="post-content">
          <ul className="list-group">
            { this.state.posts.map(
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