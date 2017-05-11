import React from 'react';
import './Search.css';

class Search extends React.Component {
    filterList(event){
        var updatedList = this.props.posts;
        //console.log(updatedList);
        
        updatedList = updatedList.filter(function(item){
        return item.toLowerCase().search(
            event.target.value.toLowerCase()) !== -1;
        });
        // now we need to set the state of the component
        //this.setState({posts: updatedList});
    }


    handleChange(event) {
        console.log('filter');
    }

    componentDidMount() {
        //console.log(this.props.posts);
    }

    render() {
        return (
            <div className="search-container">
                
                <input type="text" placeholder="Search..." onChange={this.filterList}/>
                <button>Go!</button>
            </div>
        );
        
    }
}
export default Search;