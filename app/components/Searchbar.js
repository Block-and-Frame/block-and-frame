import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div>
          <input
            className="prompt"
            type="search"
            placeholder="Search Spreads..."
            value={this.props.filterText}
            onChange={this.onuserinput}
          />
          <i className="search icon"></i>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
};

export default SearchBar;
