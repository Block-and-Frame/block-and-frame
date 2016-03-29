import React, { Component } from 'react';
import userHelpers from '../../utils/userHelpers';
import BringerView from './BringerView.js';

class Contribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      username: '',
      userLocation: '',
      isTraveling: null,
      instagramPic: '',
      instagramUsername: '',
    };

    this._onCheckBoxClick = this._onCheckBoxClick.bind(this);
  }

  componentDidMount() {
    if (this.props.bringer) {
      userHelpers.getAnyUserById(this.props.bringer)
      .then((user) => {
        console.log('indiv user in ContributionListItem ajax calls', user);
        this.setState({
          userEmail: user.data.email,
          username: user.data.username,
          isTraveling: user.data.is_traveling,
          userLocation: user.data.location,
          instagramPic: user.data.instagram_profile_pic,
          instagramUsername: user.data.instagram_username,
        });
      });
    }
  }

  _onCheckBoxClick(e) {
    this.props._onCheckBoxClick(e, this.props.index);
  }

  render() {
    return (
      <div className="card">
        <div className="content">
          {
            !this.props.bringer ? 
            <div className="right floated ui fitted checkbox">
              <input 
                type="checkbox"
                onChange={this._onCheckBoxClick}
              />
              <label></label>
            </div>
          :
            null
          }
          <h4 className="left floated ui sub header">{this.props.item}</h4>
          { /* If there is a note, provide a note section */
            this.props.notes && <div>
            <div className="ui clearing section divider"></div>
              <div className="meta">
                {this.props.notes}
              </div>
            </div>
          }
        </div>
        {this.props.bringer && <BringerView 
          info={this.state}
        />}
        
      </div>
    );
  }
}

export default Contribution;

