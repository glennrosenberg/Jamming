import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Track1",
          artist: "Artist1",
          album: "Album1",
          id: "001"
        },
        {
          name: "Track2",
          artist: "Artist2",
          album: "Album2",
          id: "002"
        },
        {
          name: "Track3",
          artist: "Artist3",
          album: "Album3",
          id: "003"
        }
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        {
          name: "TrackA",
          artist: "ArtistA",
          album: "AlbumA",
          id: "011"
        },
        {
          name: "TrackB",
          artist: "ArtistB",
          album: "AlbumB",
          id: "012"
        },
        {
          name: "TrackC",
          artist: "ArtistC",
          album: "AlbumC",
          id: "013"
        }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
