import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  handleChange(event) {
    this.props.onUserInput(event.target.value);
  }
  render() {
    return (
      <div>
          <input
            className="prompt"
            type="search"
            placeholder="Search Spreads..."
            value={this.props.filterText}
            onChange={this.handleChange.bind(this)}
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
