import React, { Component } from 'react';

class Direction extends Component {
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
  handleClick(str) {
    console.log(this.props.uniqueId);
    $(`#${this.props.uniqueId}`).shape('flip right');
  }
  render() {
    return (
      <div className="ui three column doubling stackable grid container" style={{ textAlign: 'center' }} >        
        <div className="ui shape column" onClick={this.handleClick} >
          <div className="sides" >
            <div className="active side">
              <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSX-3wf8Zwhqz69pblHcru56FnA-qr8_VXGc9xR31eDkimrohryRuYDbPA" width="130px" />
              <h3>Choose a Spread and an Item to Contribute</h3>
            </div>
            <div className="side">
              <h3>Info</h3>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
            </div>
          </div>
        </div>
        <div className="ui shape column" id={this.props.uniqueId} onClick={this.handleClick}>
          <div className="sides">
            <div className="active side">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Food_Bank_icon.svg/2000px-Food_Bank_icon.svg.png" width="130px" />
              <h3>Explore, Forage, Procure</h3>
            </div>
            <div className="side">
              <h3>Info</h3>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
            </div>
          </div>
        </div>
        <div className="ui shape column" onClick={this.handleClick} >
          <div className="sides" width="127px">
            <div className="active side">
              <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQmmz2PrZrW6160Wlq4afBh8d5UI10X2O96NQ0Mt96gtKc7UJZi" width="130px" />
              <h3>Share and Enjoy with New Friends</h3>
            </div>
            <div className="side">
              <h3>Info</h3>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
              <p>asdfasdfasd fasdasf asfasf asfasfasf asfa sfasf asfas fasf asfasffdasdsfgsd</p>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}

export default Direction; 
