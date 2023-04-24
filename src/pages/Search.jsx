import React from 'react';
import Carregando from '../Component/Carregando';
import Header from '../Component/Header';
// import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumResult from '../Component/AlbumResult';

class Search extends React.Component {
  state = {
    inputSearch: '',
    name: '',
    loading: false,
    loaded: false,
    searchResult: [],
  };

  // async componentDidMount() {
  //   const getUserFunc = await getUser();
  // }

  onButtonSearchClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ loading: true });
    const searchResult = await searchAlbumsAPI(inputSearch);
    this.setState({ searchResult,
      loading: false,
      loaded: true,
      inputSearch: '',
      name: inputSearch });
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const minCharacSearch = 2;
    const {
      inputSearch,
      loading,
      searchResult,
      loaded,
      name,
    } = this.state;

    const mapResult = searchResult.map(({
      // artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => (
      <AlbumResult
        key={ collectionId }
        // artistId={ artistId }
        artistName={ artistName }
        collectionId={ collectionId }
        collectionName={ collectionName }
        collectionPrice={ collectionPrice }
        artworkUrl100={ artworkUrl100 }
        releaseDate={ releaseDate }
        trackCount={ trackCount }
      />
    ));
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Carregando /> : (
          <div>
            <label htmlFor="searchArtist">
              Digite o artista
              <input
                type="text"
                id="searchArtist"
                value={ inputSearch }
                onChange={ this.onInputChange }
                name="inputSearch"
                data-testid="search-artist-input"
              />
            </label>
            <button
              data-testid="search-artist-button"
              onClick={ this.onButtonSearchClick }
              disabled={ inputSearch.length < minCharacSearch }
            >
              Pesquisar
            </button>
            {loaded
            && (
              searchResult.length === 0 ? <h2>Nenhum álbum foi encontrado</h2>
                : (
                  <div>
                    <h1>{`Resultado de álbuns de: ${name}`}</h1>
                    {mapResult}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
