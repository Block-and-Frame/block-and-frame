import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import instaHelpers from '../../utils/instaHelpers';
import eventHelpers from '../../utils/eventHelpers';
import UniqueMapView from './UniqueMapView';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagArray: [],
      randomPic: '',
      random: 0,
      comments: 0,
    };
  }

  componentWillMount() {
    if (this.props.hashtag) {
      instaHelpers.getUniqueTagPics(this.props.hashtag)
      .then((tagObject) => {
        const data = tagObject.data.data.data;
        this.setState({
          tagArray: data.map((tagObj) => {
            return tagObj.images.thumbnail.url;
          }),
          random: Math.floor((Math.random() * data.length)),
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }

    // Get ammount of comments for event
    eventHelpers.getComments(this.props.id)
    .then((res) => {
      this.setState({ comments: res.data.length });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
          <div className="ui green centered card">
            <div className="content">
              <div className="right floated meta">
                <div>{moment(`${this.props.date} ${this.props.time}`).format('MMMM Do YYYY, h:mm:ss a')}</div>
              </div>
                <div className="image host">
                  <img className="ui avatar image" src={this.props.creatorInstaPic} />
                  <div>Host: {this.props.creatorName} </div>
                  {
                    this.props.creatorInstaname ?
                      <div><i className="tiny instagram icon"></i> @{this.props.creatorInstaname}</div>
                    :
                      null
                  }

                </div>
            </div>

            <div className="image event-image">
            {
              this.state.tagArray.length > 0 ?
                <img className="eventlist-image" src={this.state.tagArray[this.state.random]} />
              :
                <UniqueMapView
                  center={this.props.center}
                  markers={this.props.markers}
                />
            }


            </div>

            <div className="content">
              <Link to={`/${this.props.id}`} className="ui header">{this.props.name}</Link>
              <div className="location">
                {/* make sure the location and description get cut off if really long */}
                <h5 className="ui header">
                  {this.props.location.slice(0, 30)} {this.props.location.length > 30 && '...'}
                </h5>

              </div>
              <div className="description">
                {/* this.props.description.slice(0, 30)} {this.props.description.length > 30 && '...' */}

              </div>
              <div className="extra content">
                <span className="right floated">
                  <i className="users outline icon"></i>
                  {this.props.numAttendees} signed up
                 </span>
               <i className="comment icon"></i>
                <label>{this.state.comments} comments</label>
              </div>
            </div>
          </div>
    );
  }
}

export default Event;
