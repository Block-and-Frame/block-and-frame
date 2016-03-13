import React from 'react';

const Site = React.createClass({
  componentDidMount() {
    console.log('here', this.props.children);
  },

  render() {
    return (
      <div>
        Site
        {this.props.children}
      </div>
    );
  },
});

export default Site;
