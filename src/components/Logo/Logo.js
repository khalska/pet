import React from 'react';

class Logo extends React.Component {
    render() {
        return (
            <div className="Page-logo">
                <img src={this.props.src}/>
            </div>
        );
        
    }
}
export default Logo;