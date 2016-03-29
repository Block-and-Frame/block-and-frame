import axios from 'axios';

const eventHelpers = {
  createEvent(event, component) {
    console.log('event to be created', event);
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    axios({
      url: `/api/events/${userId}`,
      method: 'post',
      data: event,
      headers: { Authorization: token },
    })
    .then((res) => {
      console.log('res from creating', res);
      component.context.router.push({
        pathname: `/${res.data.id}`,
      });
    })
    .catch((res) => {
      console.log(res);
    });
  },

  getEventbyId(id) {
    console.log('Iniside event helpers id: ', id);
    const token = window.localStorage.getItem('token');
    return axios({
      url: `/api/events/${id}`,
      method: 'get',
      headers: { Authorization: token },
    });
  },

  editEvent(id, stateAsUserUpdates) {
    const token = window.localStorage.getItem('token');
    console.log('data sent', stateAsUserUpdates);
    console.log('editEvent called');
    return axios({
      url: `api/events/${id}`,
      method: 'put',
      data: stateAsUserUpdates,
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log('inside eventedit');
      console.log(response);
    })
    .catch((error) => {
      console.log('ERROR');
      console.log(error);
    });
  },
  // wrap blobSender and joinEvent in third function
  joinEventWithContributions(eventId, contributions, callback) {
    eventHelpers.joinEvent(eventId, callback);
    // return this?
    eventHelpers.contributionsSave(contributions, eventId, callback);
  },
  contributionsSave(contributionsArray, eventId, callback) {
    const token = window.localStorage.getItem('token');
    return axios({
      url: `api/events/${eventId}`,
      method: 'put',
      data: { toBring: { contributions: contributionsArray } },
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log('cont save', response);
      if (callback) {
        
        callback();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  joinEvent(eventId, callback) {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    return axios({
      url: `api/events/join/${eventId}`,
      method: 'put',
      data: {
        userId,
      },
      headers: { Authorization: token },
    })
    .then((response) => {
      if (callback) {
        callback();
      }
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  getAllEvents() {
    const token = window.localStorage.getItem('token');
    return axios({
      url: '/api/events/',
      method: 'get',
      headers: { Authorization: token },
    });
  },
};

export default eventHelpers;
