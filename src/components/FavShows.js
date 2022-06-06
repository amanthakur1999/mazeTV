import { React, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import SessionContext from '../contexts/sessionContext';

function FavShows() {
  const { session } = useContext(SessionContext);
  let [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavouriteShows = async () => {
    const favShowsString = await localStorage.getItem('favShows');
    const favShows = favShowsString ? JSON.parse(favShowsString) : {};

    return favShows[session.username] || [];
  };

  useEffect(() => {
    getShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getShows = async () => {
    setLoading(true);
    const { data } = await axios.get(`https://api.tvmaze.com/shows`);
    const favShows = await getFavouriteShows();

    const favShowsDetails = data.filter((show) => {
      return favShows.includes(show.id);
    });

    setShows(favShowsDetails);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="container">
        <h1>Favourite Shows</h1>

        <ul className="flex wrap">
          {shows.map((eachShow) => {
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
export default FavShows;
