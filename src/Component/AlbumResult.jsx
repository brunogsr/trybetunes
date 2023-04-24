import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class AlbumResult extends React.Component {
  render() {
    const {
      // artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <Link
        to={ `/album/${collectionId}` }
      >
        <div
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h1>{artistName}</h1>
          <h1>{collectionName}</h1>
          <h1>{collectionPrice}</h1>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h1>{releaseDate}</h1>
          <h1>{trackCount}</h1>
        </div>
      </Link>
    );
  }
}

AlbumResult.propTypes = {
  // artistId: PropTypes.number,
  artistName: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;

export default AlbumResult;
