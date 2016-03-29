import React, { Component } from 'react';

class InstructionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSide: 1,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    $('.shape').shape();
  }
  handleClick() {
    const item = `#${this.props.s1Step}`;
    let dir = '';
    if (item === '#1') {
      dir = 'flip left';
    } else if (item === '#2') {
      dir = 'flip down';
    } else {
      dir = 'flip right';
    }
    $(item).shape(dir);
  }
  render() {
    return (        
      <div className="ui shape column instruction" onClick={this.handleClick} id={this.props.s1Step} >
        <div className="sides" >
          <div className="active side">
            <img src={this.props.s1Source} width="150" />
            <h2> - {this.props.s1Step} - </h2>
          </div>
          <div className="side" >
            <h1>{this.props.s1Step} - {this.props.s2Header}</h1>
            <p>{this.props.s2Text}</p>
          </div>
        </div>
      </div>
    );
  } 
}

export default InstructionItem; 
