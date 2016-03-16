import React from 'react';

class Site extends React.Component {
  componentDidMount() {
    console.log('Sites children', this.props);
  }

  render() {
    return (
      <div className='ui container'>
        {this.props.children}
      </div>
    );
  }
}

export default Site;
