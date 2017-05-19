import React from 'react';
import './Search.css';
import PropTypes from 'prop-types';

class Search extends React.Component {
    static propTypes = {
        filterTwxt: PropTypes.string.isRequired,
        onFilterTextButton: PropTypes.func.isRequired,
        onFilterTextInput: PropTypes.func.isRequired
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
                    onChange={ (e) => this.handleFilterTextInputChange(e) }
                />
                <div className="input-group-btn">
                    <button 
                        className="btn btn-default"
                        onClick={ (e) => this.handleFilterTextButton(e) }
                    >
                    Go!</button>
                </div>
            </div>
        );
    }
}
export default Search;
