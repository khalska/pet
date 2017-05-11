import React from 'react';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = { 
            phrase: []
        };
    }

    render() {
        return (
            <div className="Search input-group">
                <input type="text" className="form-control" placeholder="Search..." onChange={this.props.onChange}/>
                <div className="input-group-btn">
                    <button className="btn btn-default">Go!</button>
                </div>
            </div>
        );
    }
}
export default Search;