import React from 'react';
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleFilterTextButton = this.handleFilterTextButton.bind(this);
        this.state = { 
            phrase: []
        };
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleFilterTextButton() {
        this.props.onFilterTextButton();
    }

    render() {
        return (
            <div className="Search input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..." 
                    value={this.props.filterTwxt}
                    onChange={this.handleFilterTextInputChange}
                />
                <div className="input-group-btn">
                    <button 
                        className="btn btn-default"
                        onClick={this.handleFilterTextButton}
                    >
                    Go!</button>
                </div>
            </div>
        );
    }
}
export default Search;