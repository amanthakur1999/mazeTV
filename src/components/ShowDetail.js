import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
function ShowDetail() {
  let param = useParams();
  const [showDatail, setshowDatail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShows = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/shows/${param.id}`).then((res) => {
      const showsData = res.data;
      console.log(showsData);
      setshowDatail(showsData);
      setLoading(false);
    });
  };
  useEffect(() => {
    getShows();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="container">
        <ul className="showinfo">
          <li>
            <h3>{showDatail.name}</h3>
          </li>
          <div className="flex-sb">
            <li className="flex-20">
              <img
                src={showDatail?.image?.medium || ''}
                alt={showDatail.name}
              />
            </li>
            <li className="flex-45">{showDatail.summary}</li>

            <div className="flex-33 info">
              <h2>Show Info</h2>
              <li>
                <b>Language:</b>
                {showDatail?.language}
              </li>
              <li>
                <b>genres:</b>
                {showDatail?.genres}
              </li>
              <li>
                <b>Show type:</b>
                {showDatail?.type}
              </li>
              <li>
                <b>Episodes ordered:</b>
                {showDatail?.type}
              </li>
              <li>
                <b>status:</b>
                {showDatail?.status}
              </li>
              <li>
                <b>runtime:</b>
                {showDatail?.runtime}
              </li>
              <li>
                <b>schedule:</b>
                {showDatail?.schedule?.days}
              </li>
              <li>
                <b>premiered:</b>
                {showDatail?.premiered}
              </li>
              <li>
                <b>network:</b>
                {showDatail?.network?.country?.name}
              </li>
              <li>
                <b>rating:</b>
                {showDatail?.rating?.average}
              </li>
            </div>
          </div>
        </ul>
      </section>
    </>
  );
}

export default ShowDetail;
