import React from 'react';
import imageHelpers from '../../utils/imageHelpers';
import ImageUpload from './ImageUpload';

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarId: props.avatarId,
      avatarURL: 'https://s3.amazonaws.com/spreadout-img/avatar.png',
      filename: '',
      uploaded: false,
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getAvatar();
  }

  componentWillReceiveProps(nextProps) {
    console.log('NEXT', nextProps);
    if (nextProps.avatarId) {
      this.setState({ avatarId: nextProps.avatarId });
      this.getAvatar();
    } else if (!this.state.uploaded && nextProps.instagramProfilePic) {
      this.setState({ avatarURL: nextProps.instagramProfilePic });
      // this.forceUpdate();
    }
  }

  getAvatar() {
    const userId = window.localStorage.getItem('id');
    // check for a saved profile photo
    imageHelpers.getUserAvatar(userId)
    .then((res) => {
      if (res.data.filepath) {
        // if found, set the state
        this.setState({ avatarURL: res.data.filepath });
        // this.forceUpdate();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleUploadClick() {
    const fileInput = document.querySelector('input[type=file]');
    fileInput.onchange = (e) => {
      this.setState({ filename: e.target.value.split('\\').pop() });
    };
    fileInput.click();
  }

  handleSubmit() {
    const imageFile = document.querySelector('input[type=file]').files[0];

    imageHelpers.readFileURL(imageFile, (filepath) => {
      this.setState({ avatarURL: filepath });
      imageHelpers.saveAvatarURL(filepath)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

  render() {
    return (
      <ImageUpload 
        avatarURL={this.state.avatarURL}
        filename={this.state.filename}
        handleUploadClick={this.handleUploadClick}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Uploader;
