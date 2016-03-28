import axios from 'axios';

const userHelpers = {
  getCurrentUserData() {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');
    return axios({
      url: `/api/users/${userId}`,
      method: 'get',
      headers: { Authorization: token },
    });
  },

  getAnyUserById(userId) {
    const token = window.localStorage.getItem('token');
    return axios({
      url: `/api/users/${userId}`,
      method: 'get',
      headers: { Authorization: token },
    });
  },

  updateUser(stateAsUserUpdates) {
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('id');

    // Format for database
    stateAsUserUpdates.is_traveling = stateAsUserUpdates.isTraveling;
    delete stateAsUserUpdates.isTraveling;

    console.log('updateUser called with:', stateAsUserUpdates);
    return axios({
      url: `api/users/${userId}`,
      method: 'put',
      data: stateAsUserUpdates,
      headers: { Authorization: token },
    });
  },
  deleteUser() {
    const userId = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    return axios({
      url: `api/users/${userId}`,
      method: 'delete',
      headers: { Authorization: token },
    });
  },
};

export default userHelpers;
