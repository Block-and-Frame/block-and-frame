const authHelpers = {
  storeToken(token, userId, instaUser) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('id', userId);

    if (instaUser) {
      window.localStorage.setItem('instaUser', instaUser);
    }
  },

  logout() {
    window.localStorage.clear();
  },
};

export default authHelpers;
