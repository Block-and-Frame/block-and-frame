import React, { Component } from 'react';

class InstructionItem extends Component {
  render() {
    return (        
      <div className="instruction" id={this.props.step} >
          <div className="view overlay">
            <img src={this.props.imgSource} />
            <div className="mask">
                <b>{this.props.step} </b>
                <p>{this.props.header}</p>
                <a href="#" className="info">Read More</a>
            </div>
          </div>
      </div>
    );
  } 
}

export default InstructionItem; 
