import React from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }
  render() {
    if (this.props.isOpen === false)
      return null

    return (
      <div className="Modal">
        <div className="modal_container">
          {this.props.children}
        </div>
        <div className="modal_background" onClick={e => this.close(e)} />
        </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

export default Modal;
