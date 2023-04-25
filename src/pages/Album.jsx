import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Component/Header';
import MusicCard from '../Component/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicsArr: [],
  };

  componentDidMount() {
    this.getMusicsArr();
  }

  getMusicsArr = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicsArr = await getMusics(id);
    this.setState({
      musicsArr,
    });
    console.log(musicsArr);
  };

  render() {
    const { musicsArr } = this.state;
    const album = musicsArr.find((item) => item);
    return (
      <div data-testid="page-album">
        <Header />
        {album && (
          <div>
            <h2 data-testid="artist-name">{album.artistName}</h2>
            <h2 data-testid="album-name">{album.collectionName}</h2>
          </div>
        )}
        {musicsArr && (
          <div>
            {musicsArr.map((musicObj) => (
              <div key={ musicObj.trackId }>
                {musicObj.previewUrl && (
                  <div>
                    <h3>{musicObj.trackName}</h3>
                    <MusicCard
                      previewUrl={ musicObj.previewUrl }
                      trackId={ musicObj.trackId }
                      musicObj={ musicObj }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Album;
