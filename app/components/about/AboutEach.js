import React, { Component } from 'react';

class AboutEach extends Component {
  render() {
    return (
      <div className="ui internally celled two-column grid">
        <div className="row">
          <div className="seven wide column">
            <img className="ui tiny circular image" src={this.props.imgSource} />
           </div>
           <div className="nine wide column">
              <b>{this.props.name}</b>
              <p>{this.props.role}</p>
            </div>
        </div>
      </div>
    );
  } 
}

export default AboutEach;
