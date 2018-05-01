import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.props.onNameChange(name);
  }

  handleSave() {
    this.props.onSave();
    this.props.onNameChange("New Playlist");
  }

  render() {
    const isRemoval = true;
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.playlistTracks} isRemoval={isRemoval} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
