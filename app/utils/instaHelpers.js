// https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN
import axios from 'axios';


const instaHelpers = {
  getAllThisUsersPics(accessToken) {
    return axios.post('api/insta/getUserPics', { accessToken });
  },
};

export default instaHelpers;

