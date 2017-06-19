import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from "react-redux";
import './Info.css';
import {
  signIn
} from '../../actions/auth';

class Info extends React.Component {
  static propTypes = {
    info: PropTypes.array
  }

  __renderInfo() {
    return(
      this.props.info.map((i, index) => <li key={index}> {i} </li>)
    )
  }

  render() {
    return (
      <div className={classNames('Info')}>
        {
          this.props.info.length > 0 &&
            <ul className="info alert alert-danger">
              { this.__renderInfo() }
            </ul>
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (login) => dispatch(signIn(login))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);