// https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN
import axios from 'axios';


const instaHelpers = {
  getAllThisUsersPics(accessToken) {
    return axios.post('api/insta/getUserPics', { accessToken });
  },
  getUniqueTagPics(hashtag) {
    const userId = window.localStorage.getItem('id');
    console.log('getUniqueTagPics', hashtag);
    if (hashtag[0] === '#') {
      hashtag = hashtag.slice(1);
      console.log(hashtag);
    }
    if (hashtag !== undefined) {
      return axios.post('api/insta/getUniqueTagPics', { hashtag, userId });
    }
  },
};

export default instaHelpers;
