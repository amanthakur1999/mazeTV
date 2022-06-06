import { React, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';

import SessionContext from '../contexts/sessionContext';

function Home() {
  const { session, setSession } = useContext(SessionContext);
  const { navigate } = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [favouriteShows, setFavouriteShows] = useState([]);

  const getFavouriteShows = async (dontSetInState) => {
    const favShowsString = await localStorage.getItem('favShows');
    const favShows = favShowsString ? JSON.parse(favShowsString) : {};
    const userFavShows = favShows[session.username] || [];

    if (dontSetInState) {
      return favShows || {};
    }

    setFavouriteShows(userFavShows);
  };

  useEffect(() => {
    getShows();
    getFavouriteShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShows = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/shows`).then((res) => {
      const showsData = res.data;
      setShows(showsData);
      setLoading(false);
    });
  };

  const searchShows = (q = '') => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${q}`).then((res) => {
      const showsData = res.data.map((show) => show.show);

      setShows(showsData);
      setLoading(false);
    });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (search) {
        searchShows(search);
      } else {
        getShows();
      }
    }
  };

  const setFavShow = async (showId, isShowFav) => {
    const allUserFavShows = await getFavouriteShows(true);
    console.log(allUserFavShows, 'allUserShows');
    const userFavShows = allUserFavShows[session.username] || [];
    let shows = null;

    if (isShowFav) {
      shows = userFavShows.filter((show) => {
        return show !== showId;
      });
    } else {
      shows = [...userFavShows, showId];
    }

    await localStorage.setItem(
      'favShows',
      JSON.stringify({ ...allUserFavShows, [session.username]: shows })
    );

    setFavouriteShows(shows);
  };

  const logOut = () => {
    setSession({
      hasSession: false,
      username: null,
    });
    navigate('/login');
  };

  const removeAccount = async () => {
    const allUsersString = await localStorage.getItem('user');
    const allUsers = JSON.parse(allUsersString);

    const filteredAccount = allUsers.filter((user) => {
      return user.email !== session.username;
    });

    await localStorage.setItem('user', JSON.stringify(filteredAccount));

    setSession({
      hasSession: false,
      username: null,
    });
    navigate('/login');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <header className="header flex-sb align-center">
        <div>
          <h2>TVMAZA</h2>
        </div>
        <div>
          <Link to="/fav">
            <button className="btn from-right ">Favourite</button>
          </Link>
          <button onClick={logOut} className="btn from-left">
            LogOut
          </button>
          <button onClick={removeAccount} className="btn from-left">
            Remove Account
          </button>
        </div>
      </header>
      <section className="container">
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            name=""
            placeholder="Search People and Show"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="searchButton" href="#">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <h1>Shows</h1>

        <ul className="flex-sb wrap">
          {shows.map((eachShow) => {
            const favShow = favouriteShows.includes(eachShow.id);
            return (
              <div key={eachShow.id} className="flex-18 showcard">
                <Link to={`/showDetail/${eachShow.id}`}>
                  <li>
                    <img
                      src={eachShow?.image?.medium || ''}
                      alt={eachShow.name}
                    />
                  </li>
                </Link>
                <div className="show-detail">
                  <Link to={`/showDetail/${eachShow.id}`}>
                    <li>
                      <h2>{eachShow.name}</h2>
                    </li>
                  </Link>
                  <div className="flex-sb rating-div">
                    <i
                      onClick={() => setFavShow(eachShow.id, favShow)}
                      className={`fas fa-heart ${favShow ? 'active' : ''}`}
                    ></i>

                    <i className="fas fa-star">
                      <span>{eachShow.rating.average}</span>
                    </i>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </section>
    </>
  );
}
export default Home;
