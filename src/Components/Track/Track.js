import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return '-';
    } else {
      return '+';
    }
  }

  addTrack() {
    const newTrack = this.props.track;
    this.props.onAdd(newTrack);
    // console.log(newTrack);
  }

  removeTrack() {
    const removeTrack = this.props.track;
    this.props.onRemove(removeTrack);
  }

  handleClick() {
    if (this.props.isRemoval) {
      this.removeTrack();
    } else {
      this.addTrack();
    }
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
        <a className="Track-action" onClick={this.handleClick}>{this.renderAction()}</a>
      </div>
    );
  }
}

export default Track;
