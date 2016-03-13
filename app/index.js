import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Site from './containers/Site';
import App from './containers/App';
import Event from './containers/Event';
import EventList from './containers/EventList';
import Login from './containers/Login';
import UserProfile from './containers/UserProfile';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Site}>
      <Route path="login" component={Login} />
      <Route path="app" component={App}>
        <Route path="users/:userName" component={UserProfile} />
        <Route path="events" component={EventList} />
        <Route path="events/:eventID" component={Event} />
      </Route>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

// Site
//   / Component: Login

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
