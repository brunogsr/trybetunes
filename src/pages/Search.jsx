import React from 'react';
import Header from '../Component/Header';

class Search extends React.Component {
  state = {
    artist: '',
    isButtonDisabled: true,
  };

  validationFields = () => {
    const {
      artist,
    } = this.state;
    const minValue = 2;
    const valArtist = artist.length >= minValue;
    this.setState({
      isButtonDisabled: !valArtist,
    });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  render() {
    const { isButtonDisabled, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="searchArtist">
          Digite o artista
          <input
            type="text"
            id="searchArtist"
            value={ artist }
            onChange={ this.onInputChange }
            name="artist"
            data-testid="search-artist-input"
          />
        </label>
        <button
          data-testid="search-artist-button"
          onClick={ this.onInputChange }
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
