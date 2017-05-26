import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from "../../routes";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header title="Welcome to React" />
        <Main />
        <Footer />
      </div>
    );
  }
}
export default App;
