import React from 'react';

const UniqueEventEdit = (props) => {
  return (
    <div className="container">
      <form className="ui small form" id="eventEdit">
        <div className="two fields">   
        
          <div className="field">
            <label>Spread: </label>
            <div className="ui left input">
              <input
                type="text"
                className="eventName"
                value={props.eventName}
                placeholder={props.eventName}
                onChange={props.editState}
              />
            </div>
          </div>
              
          <div className="field">
            <label>Location: </label>
            <div className="ui left input">
              <input
                type="text"
                className="location"
                value={props.location}
                placeholder={props.location}
                onChange={props.editState}
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label>Description: </label>
          <div className="ui left input">
            <textarea
              rows="3"
              className="description"
              value={props.description}
              placeholder={props.description}
              onChange={props.editState}
            />
          </div>
        </div>
            
        <div
          className="ui tiny submit button"
          onClick={props.setEdit}
        >
          <i className="icon save"></i>
          Save Changes
        </div>
      
      </form>  
    </div>
  );
};

export default UniqueEventEdit;
