import React, { Component } from 'react';
import InstructionItem from './InstructionItem';
import InstructionText from './InstructionText.js';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCredentials: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ showCredentials: !!!this.state.showCredentials });
  }
  render() {
    return (
      <div className="ui three column doubling stackable grid container instructions" >
        { InstructionText.map(el => 
          <InstructionItem key={el.step}
            imgSource={el.imgSource} 
            step={el.step} 
            header={el.header}
            txt={el.txt} 
          />
        )}
      </div>
    );
  }
}

export default Instructions;
