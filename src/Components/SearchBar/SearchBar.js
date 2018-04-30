import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
constructor(props) {
  super(props);

  this.handleSearch = this.handleSearch.bind(this);
  this.handleTermChange = this.handleTermChange.bind(this);
}

  handleSearch() {
    this.props.onSearch();
  }

  handleTermChange(event) {
    const searchTerm = event.target.value;
    this.props.onTermChange(searchTerm);
  }

  render() {
    return (
      <div className="SearchBar">
        {/* <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} /> */}
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
