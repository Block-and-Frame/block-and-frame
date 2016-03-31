import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="ui vertical footer inverted segment" id="footer">
          <div className="ui center aligned container">
            <div className="ui inverted stackable divided grid">
            
              <div className="five wide column">
                <h4 className="ui inverted header">Navigation</h4>
                <div className="ui inverted  link list">
                  <a href="/" className="item">Home</a>
                  <a href="#" className="item">Dashboard</a>
                  <a href="#" className="item">View Spreads</a>
                  <a href="#" className="item">Host a Spread</a>
                </div>
              </div>
              <div className="five wide column">
                <h4 className="ui inverted header">Follow Us:</h4>
                <div className="ui inverted link list">
                  <div className="item">
                    <button className="social ui circular instagram icon button">
                        <i className="instagram icon"></i>
                    </button>
                  </div>

                  <div className="item">
                    <button className="social ui circular facebook icon button">
                      <i className="facebook icon"></i>
                    </button>
                  </div>

                     <div className="item">
                    <button className="social ui circular github icon button">
                      <i className="github icon"></i>
                    </button>
                  </div>

                </div>
              </div>
              <div className="six wide column">
                <h4 className="ui inverted  header">Spread Out</h4>
                <p>Making the world a better place by connecting new friends around communal food-centered experiences</p>
              </div>
            </div>
            <div className="ui inverted section divider"></div>
            <div className="ui inverted horizontal  small divided link list">
              <a href="https://github.com/Block-and-Frame/block-and-frame/blob/master/PRIVACY-POLICY.md" className="item">Privacy Policy</a>
              <a href="/about" className="item">About Us</a>
              <a href="#" className="item">Contact Us</a>
            </div>
          </div>
          </div>
    );
  }
}

export default Footer;

