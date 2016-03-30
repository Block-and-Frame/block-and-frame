import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
// Sass file imported:
import '../dist/main.scss';

// Moved to index.html
// jQuery and CDN for Semantic-UI
// import $ from 'jquery';
// import jQuery from 'jquery';
// window.$ = $;
// window.jQuery = jQuery;
// $('head').append($('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css">'));
// $('body').append($('<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js"></script>'));
// $('body').append($('<script src="../app/csstemp/main.css"></script>'));

// TODO: do we even need App?
// import App from './containers/App';
import Site from './containers/Site';
import EventList from './containers/EventList';
import CreateEvent from './containers/CreateEventContainer';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Profile from './containers/UserProfile';
import EditUserProfile from './containers/EditUserProfile';
import UniqueEvent from './containers/UniqueEvent';
import LandingPage from './containers/LandingPage';
import About from './containers/About';

// TODO: Index Route may change - whatever we want to render
// on visiting the site home path '/'
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Site} >
      <IndexRoute component={LandingPage} />
      <Route path="signin" component={Signin} />
      <Route path="signup" component={Signup} />
      <Route path="about" component={About} />
      <Route path="editProfile" component={EditUserProfile} />
      <Route path="profile" component={Profile} />
      <Route path="events" component={EventList} />
      <Route path="eventcreate" component={CreateEvent} />
      <Route path="/:eventID" component={UniqueEvent} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
