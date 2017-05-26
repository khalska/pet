import React from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    children: PropTypes.node
  }
  
  render() {
    if (this.props.isOpen === false) {
      return null
    }

    return (
      <div className="Modal">
        <div className="modal_container">
          {this.props.children}

          <div className="btn-group">
            <button type="button" className="btn btn-default btn-sm" onClick={ () => this.props.onConfirm() }>
              <span className="glyphicon glyphicon-ok"></span> Yes
            </button>
            <button type="button" className="btn btn-default btn-sm" onClick={ () => this.props.onClose() }>
              <span className="glyphicon glyphicon-remove"></span> No
            </button>
          </div>

        </div>
        <div className="modal_background" onClick={ (e) => this.close(e) } />
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
