import React from 'react';
import { Link } from 'react-router';
import EventList from './EventList';

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Link to={'/app/events'}>
          Become a Host!<br />
        </Link>
        <Link to={'/profile'}>
          Profile
        </Link>
        <EventList>list</EventList>
      </div>

    );
  }
}

export default App;
