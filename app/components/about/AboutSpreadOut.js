import React, { Component } from 'react';

class AboutSpreadOut extends Component {
  render() {
    return (
      <div>
        <div className="ui two-column grid" >
          <div className="column" >
            <h2>The Project</h2>
          </div>
          <div className="fifteen wide column" >
            <div className="ui text container">
              <p>Making the world a better place by bringing together new friends around communal food-centered experiences. 
              </p>
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="ui two-column grid" >
          <div className="column" >
            <h2>The Stack</h2>
          </div>
          <div className="fifteen wide column" >
            <div className="ui text container">
              <div className="ui top aligned tiny images " >
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/React.js_logo.svg" />
                <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" />
                <img src="http://www.postgresql.org/files/community/propaganda/100x58_1.gif" />
                <img src="https://cdn.travis-ci.com/images/logos/TravisCI-Mascot-1-61693e8ade8a553878c2307f0c08749d.svg" />
                <img src="http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" />
                <img src="https://s3.amazonaws.com/spreadout-img/Webpack.png" />
                <img src="http://awsmedia.s3.amazonaws.com/AWS_Logo_PoweredBy_127px.png" />
              </div>
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
      </div>
    );
  } 
}

export default AboutSpreadOut;
