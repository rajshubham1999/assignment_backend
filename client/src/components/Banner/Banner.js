import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '330px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  marginTop: '0px',
};

const imageStyle = {
  width: '100%', // Set image width to 100% to cover the entire carousel width
};

const Banner = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://www.animatedtimes.com/wp-content/uploads/2021/02/inception-5e49db3984ffe__880.jpg"
          style={imageStyle} // Apply image style
          alt="Banner Image"
        />
      </h3>
    </div>
    <div>
    <h3 style={contentStyle}>
        <img
          src="https://www.bollywooindia.com/wp-content/uploads/2018/12/2018-movie-banner-images.png"
          style={imageStyle} // Apply image style
          alt="Banner Image"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <img
          src="https://teaser-trailer.com/wp-content/uploads/Avengers-Infinity-War-Banner.jpg"
          style={imageStyle} // Apply image style
          alt="Banner Image"
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
      <img
          src="https://collider.com/wp-content/uploads/inception_movie_poster_banner_04.jpg"
          style={imageStyle} // Apply image style
          alt="Banner Image"
        />
      </h3>
    </div>
  </Carousel>
);

export default Banner;

