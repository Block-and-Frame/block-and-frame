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
          <InstructionItem key={el.s1Step}
            s1Source={el.s1Source} 
            s1Step={el.s1Step} 
            s2Header={el.s2Header}
            s2Text={el.s2Text} 
          />
        )}
      </div>
    );
  }
}

export default Instructions;
