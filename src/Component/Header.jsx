import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.getUser();
  }

  async getUser() {
    const user = await getUser();
    this.setState({
      name: user.name,
      loading: false,
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Carregando /> : <p data-testid="header-user-name">{ name }</p> }
        <div>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </div>
      </header>
    );
  }
}

export default Header;
