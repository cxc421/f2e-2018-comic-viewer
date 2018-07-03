import React from 'react';
import 'styles/Home.scss';

import COVER_IMG from 'images/comic_cover.png';

const Home = () => {
  return <div className="home">
      <div className="content">
        <div className="left">
          <img src={COVER_IMG} alt="cover" />
        </div>
        <div className="right">
          <h1 className="title">MY HEXSCHOOL</h1>

          <div className="body">
            <div className="body-top">
              <div className="body-top-left">
                <h2>Genres</h2>
                <h2>Author</h2>
                <h2>Status</h2>
                <h2>Rate</h2>
              </div>
              <div className="body-top-right">
                <p>Fusce/vehicula/dolor</p>
                <p>Namae Shiranai</p>
                <p>Ongoing</p>
                <p>Start List</p>
              </div>
            </div>

            <div className="body-bottom">
              <h2>Summary</h2>
              <p>
                If your banker breaks, you snap; if your apothecary by mistake
                sends you poison in your pills, you die. 
              </p>
              <p>
              Therefore, I say, I
              saw that this situation of mine was the precise situation of
              every mortal that has this Siamese connexion with a plurality of other mortals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

export default Home;