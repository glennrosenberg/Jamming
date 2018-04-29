import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render () {
    const isRemoval = this.props.isRemoval;
    const onAdd = this.props.onAdd;
    return (
      <div className="TrackList">
          {
            this.props.tracks.map(track => {
              return <Track track={track} key={track.id} isRemoval={isRemoval} onAdd={onAdd} />;
            })
          }
      </div>
    );
  }
}

export default TrackList;
