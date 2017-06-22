import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div className="container">
        <Header title="Welcome to React" />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
export default Layout;
