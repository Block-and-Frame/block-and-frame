import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// jQuery and CDN for Semantic-UI
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = $;
window.jQuery = jQuery;
$('head').append($('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css">'));
$('body').append($('<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.js"></script>'));
$('body').append($('<script src="../app/csstemp/main.css"></script>'));


// import Site from './containers/Site';
import App from './containers/App';
import Event from './containers/Event';
import EventList from './containers/EventList';
import CreateEvent from './containers/CreateEvent';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import UserProfile from './containers/UserProfile';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" /* component={Site} */>
      <Route path="signin" component={Signin} />
      <Route path="signup" component={Signup} />
      <Route path="app" component={App} />
      <Route path="profile" component={UserProfile} />
      <Route path="events" component={EventList} />
      <Route path="events/:eventID" component={Event} />
      <Route path="eventcreate" component={CreateEvent} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

// Site
//   / Component: Signin

//   / Component: Profile                  food.com/app/   user/:username
//     / Component: user Profile
//         Component: user Info
//         Component: Ratings
//     / Component: EventList            food.com/app/   user/:username
//          Component: event 2              food.com/app/  events/:eventId
//          Component: event 4              food.com/app/  events/:eventId

//   / Component: EventList                food.com/app/ events
//       Component: Date: 3/20:
//       Component: event 1                food.com/app/  events/:eventId
//       Component: event 2
//       Component:  3/21:
//       Component: event 3 (mini comp)
//       Component: event 4

//    // / Component: event 3               food.com/app/  ??
//    //      Component: user1
//    //      Component: user2
//    //      Component: user5

// //do we want events to expand or open a new page?
