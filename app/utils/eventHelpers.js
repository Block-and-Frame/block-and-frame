import axios from 'axios';

const eventHelpers = {
  createEvent(event, component) {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    console.log('event in helper', event);
    axios({
      url: `/api/events/${userId}`,
      method: 'post',
      data: event,
      headers: { Authorization: token },
    })
    .then((res) => {
      console.log('res from creating', res);
      component.context.router.push({
        pathname: '/events',
        // TODO: change path to /event once available
        // state: res.data,
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
  joinEventWithContributions(eventId, contributions) {
    console.log('helpers', eventId, contributions)
    eventHelpers.joinEvent(eventId);
    eventHelpers.contributionsSave(contributions, eventId);
  },
  contributionsSave(contributionsArray, eventId) {
    const token = window.localStorage.getItem('token');
    return axios({
      url: `api/events/${eventId}`,
      method: 'put',
      data: { toBring: { contributions: contributionsArray } },
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log('cont save', response);
    })
    .catch((error) => {
      console.log(error);
    });
  },
  joinEvent(eventId) {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    return axios({
      url: `api/events/join/${eventId}`,
      method: 'put',
      data: {
        userId,
        // TODO include contributions ?
      },
      headers: { Authorization: token },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  },
};

export default eventHelpers;
