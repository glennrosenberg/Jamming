import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: undefined,
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.termChange = this.termChange.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(element => element.id === track.id)) {
      return;
    }
    const newPlaylistTracks = this.state.playlistTracks.concat(track);
    this.setState({ playlistTracks: newPlaylistTracks });
    // console.log(track);
    // this.state.playlistTracks.forEach(element => {
    //   console.log(element.name);
    // });
  }

  removeTrack(track) {
    const newPlaylistTracks = this.state.playlistTracks.filter(element =>
      track.id !== element.id
    );
    this.setState({ playlistTracks: newPlaylistTracks });
    // console.log(track);
    // this.state.playlistTracks.forEach(element => {
    //   console.log(element.name);
    // });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
    // console.log(this.state.playlistName);
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  termChange(searchTerm) {
    this.setState({ searchTerm: searchTerm });
  }

  search() {
    Spotify.search(this.state.searchTerm).then( searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onTermChange={this.termChange} onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
