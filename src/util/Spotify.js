
const spotifyRedirectUri = "http://localhost:3000/";
const spotifyClientId = "940628e8771549a38eb223a1c4039d7e";
// const spotifyClientSecret = "f81337208b8745299d26abf827a8de36";
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${spotifyRedirectUri}`;
const spotifyCurrentUserUrl = `https://api.spotify.com/v1/me`;
let userAccessToken = undefined;
let userAccessTokenExpiresIn = undefined;

const Spotify = {

  getAccessToken() {
    // if we have the user access token return it
    if (userAccessToken) {
      console.log('already have a token: ' + userAccessToken);
      return userAccessToken;
    }
    // otherwise check to see if the token and the expiry time are in the page URL
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      userAccessToken = urlAccessToken[1];
      userAccessTokenExpiresIn = urlExpiresIn[1];
      window.setTimeout(() => userAccessToken ='', userAccessTokenExpiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyAuthUrl;
    }
  },

  async search(searchTerm) {
    const spotifySearchUrl = "https://api.spotify.com/v1/search?type=track&q=" + searchTerm;
    console.log(spotifySearchUrl);
    try {
      let response = await fetch(spotifySearchUrl, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
          return [];
        }
        let trackList = jsonResponse.tracks.items.map( track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
        console.log(trackList);
        return trackList;
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || trackURIs.length === 0) {
      return;
    }
    let spotifyUserId = undefined;
    let playlistId = undefined;
    try {
      let response = await fetch(spotifyCurrentUserUrl, {
        headers: {
          Authorization: `Bearer ${userAccessToken}`
        }
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        spotifyUserId = jsonResponse.id;
      }
      if (spotifyUserId) {
        const spotifyCreatePlaylistUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists`;
        let response = await fetch(spotifyCreatePlaylistUrl, {
          method: 'POST',
          body: JSON.stringify({ name: playlistName }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userAccessToken}`
          }
        });
        if (response.ok) {
          let jsonResponse = await response.json();
          playlistId = jsonResponse.id;
        }
      }
      if (playlistId) {
        const spotifyAddPlaylistTracksUrl = `https://api.spotify.com/v1/users/${spotifyUserId}/playlists/${playlistId}/tracks`;
        let response = await fetch(spotifyAddPlaylistTracksUrl, {
          method: 'POST',
          body: JSON.stringify({ uris: trackURIs }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userAccessToken}`
          }
        });
        if (response.ok) {
          console.log("tracks added to playlist");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Spotify;
