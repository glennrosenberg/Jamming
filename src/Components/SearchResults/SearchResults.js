import React from 'react';
import './SearchResults.css';
import './tooltips.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render () {
    const isRemoval = false;
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} isRemoval={isRemoval} onAdd={this.props.onAdd} />
        <div className="pageNav">
          <button tooltip="previous results" flow="right" className="triangle-left"></button>
          <button tooltip="next results" flow="left" className="triangle-right"></button>
        </div>
      </div>
    );
  }
}

export default SearchResults;
