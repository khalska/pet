import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <h1 className="Header">{this.props.title} </h1>
        );
        
    }
}
export default Header;