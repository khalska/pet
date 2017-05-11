import React from 'react';
import './Logo.css';

class Logo extends React.Component {
    render() {
        return (
            <div className="Logo">
                <img src={this.props.src}/>
            </div>
        );
        
    }
}
export default Logo;