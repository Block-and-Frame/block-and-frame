import React, { Component } from 'react';

class CarouselItem extends Component {
  render() {
    return (
      <div className="carousel__pane">
        <div className="ui internally celled two-column stackable grid">
          <div className="eight wide column">
            <img className="ui medium rounded image" src={ this.props.imgSource } />
          </div> 
          <div className="eight wide column">
            <div>
              <h2> {this.props.name} </h2>
              <b> {this.props.role} </b><br /><br />
              <b> {this.props.role2} </b>
            </div>
          </div>
          <br /><br />
          <div>
            <p>{this.props.blurb}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselItem;
