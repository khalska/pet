import React from 'react';
import './Logo.css';
import PropTypes from 'prop-types';

class Logo extends React.Component {
    propTypes = {
        src: PropTypes.string
    }
    render() {
        return (
            <div className="Logo">
                <img src={this.props.src}/>
            </div>
        );
    }
}
export default Logo;
