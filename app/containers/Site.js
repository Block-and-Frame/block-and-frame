import React from 'react';
import { browserHistory } from 'react-router';
import Footer from '../components/Footer';

class Site extends React.Component {
  componentDidMount() {
    const path = location.href.split('/').pop();
    // check if have a cookie:
    if (path !== 'signup' && !window.localStorage.token) {
      browserHistory.push('/signin');
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Site;
