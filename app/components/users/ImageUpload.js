import React from 'react';

const ImageUpload = ({ filename, avatarURL, handleSubmit, handleUploadClick }) => {
  return (
    <div className="ui compact segment">
      <img 
        id="test"
        className="ui small spaced rounded image"
        src={avatarURL}
      />
      <div className="ui divider" />
      
      <form onSubmit={(e) => {e.preventDefault(); }}>
        <button
          className="ui tiny button"
          onClick={handleUploadClick}
        >Select Profile Image
        </button>
        
        <div className="ui fitted hidden divider" />
        <div>
          { /* show filename after image is selected */ filename && 
            <div className="ui basic small label">{filename}</div>
          }
        </div>
        
        <div className="ui fitted hidden divider" />
        {/*  Actual input field hidden - using a styled button in its place to activate submit */}
        <input
          type="file"
          accept="image/*"
          id="image-file"
          placeholder="upload image"
          style={{ display: 'none' }}
        />
        <button
          className="ui tiny button"
          onClick={handleSubmit}
        >
          <i className="plus square icon"></i>
          Upload
        </button>
      </form>
     </div>
  );
};

export default ImageUpload;

