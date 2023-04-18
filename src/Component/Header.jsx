import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const getUserFunc = await getUser();
    this.setState({
      user: getUserFunc,
      loading: false,
    });
  }

  // async getUser() {
  //   const user = await getUser();
  //   this.setState({
  //     user: user.user,
  //     loading: false,
  //   });
  // }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Carregando /> : <p data-testid="header-user-name">{ user.name }</p> }
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
