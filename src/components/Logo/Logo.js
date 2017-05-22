import React from 'react';
import './Logo.css';
import PropTypes from 'prop-types';

class Logo extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired
    }
    render() {
        return (
            <div className="Logo">
                <img src={this.props.src} alt="Logo" />
            </div>
        );
    }
}
export default Logo;
