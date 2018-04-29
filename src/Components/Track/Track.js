import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddTrack = this.handleAddTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return '-';
    } else {
      return '+';
    }
  }

  handleAddTrack() {
    const newTrack = this.props.track;
    this.props.onAdd(newTrack);
    // console.log(newTrack);
  }

  render() {
    const name = this.props.track.name;
    const artist = this.props.track.artist;
    const album = this.props.track.album;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>{artist} | {album}</p>
        </div>
        <a className="Track-action" onClick={this.handleAddTrack}>{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
