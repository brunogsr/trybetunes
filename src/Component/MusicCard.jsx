import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favoriteCheckbox: false,
  };

  onFavoriteCheckboxChange = async ({ target }) => {
    // console.log(target.checked);
    this.setState({ loading: true });
    const { name } = target;
    this.setState({
      [name]: target.checked,
    });
    const { musicObj } = this.props;
    await addSong(musicObj);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { loading, favoriteCheckbox } = this.state;
    const { previewUrl, trackId } = this.props;
    return loading ? <Carregando /> : (
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
        </audio>
        <label
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            name="favoriteCheckbox"
            checked={ favoriteCheckbox }
            value={ favoriteCheckbox }
            onChange={ this.onFavoriteCheckboxChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
