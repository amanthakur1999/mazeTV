import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
function ShowDetail() {
  let param = useParams();
  const [showDetail, setShowDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShows = () => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/shows/${param.id}`).then((res) => {
      const showsData = res.data;
      console.log(showsData);
      setShowDetail(showsData);
      setLoading(false);
    });
  };
  useEffect(() => {
    getShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="fav-section">
        <h2> Show Detail</h2>
      </div>
      <section className="container">
        <ul className="showinfo">
          <li>
            <h3>{showDetail.name}</h3>
          </li>
          <div className="flex-sb">
            <li className="flex-20">
              <img
                src={
                  showDetail?.image?.medium ||
                  'https://static.tvmaze.com/uploads/images/medium_portrait/19/49606.jpg'
                }
                alt={showDetail.name}
              />
            </li>
            <li
              className="flex-45"
              dangerouslySetInnerHTML={{ __html: showDetail.summary }}
            ></li>

            <div className="flex-33 info">
              <h2>Show Info</h2>
              <li>
                <b>Language:</b>
                {showDetail?.language}
              </li>
              <li>
                <b>genres:</b>
                {showDetail?.genres}
              </li>
              <li>
                <b>Show type:</b>
                {showDetail?.type}
              </li>
              <li>
                <b>Episodes ordered:</b>
                {showDetail?.type}
              </li>
              <li>
                <b>status:</b>
                {showDetail?.status}
              </li>
              <li>
                <b>runtime:</b>
                {showDetail?.runtime}
              </li>
              <li>
                <b>schedule:</b>
                {showDetail?.schedule?.days}
              </li>
              <li>
                <b>premiered:</b>
                {showDetail?.premiered}
              </li>
              <li>
                <b>network:</b>
                {showDetail?.network?.country?.name}
              </li>
              <li>
                <b>rating:</b>
                {showDetail?.rating?.average}
              </li>
            </div>
          </div>
        </ul>
      </section>
    </>
  );
}

export default ShowDetail;
