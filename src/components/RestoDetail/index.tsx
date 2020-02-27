import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import classes from './index.module.css';
import { RestoProps, PhotoElement } from '../types';
import axios from '../../axios';

interface Props {
  resto: RestoProps;
  goBack(): any;
}

const RestoDetail = (props: Props) => {
  const [seeAllPhotos, setSeeAllPhotos] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    _fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const _fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `/reviews?res_id=${props.resto.id}&start=${start}&count=3`,
      );
      setReviews(
        start === 0
          ? data.user_reviews.map((r: any) => r.review)
          : [...reviews, ...data.user_reviews.map((r: any) => r.review)],
      );
    } catch (e) {
      console.log(e);
    }
  };

  const photos = seeAllPhotos
    ? props.resto.photos
    : props.resto.photos.slice(0, 3);

  return (
    <div className={classes.detail}>
      <div className={classes.title}>
        <p style={{ cursor: 'pointer' }} onClick={props.goBack}>
          <Icon size={1} path={mdiHome} /> Back to home
        </p>
        <h2>{props.resto.name}</h2>
      </div>
      <div className={classes.gallery}>
        {photos.map((p: PhotoElement) => (
          <img key={p.photo.id} src={p.photo.thumb_url} alt={p.photo.caption} />
        ))}
      </div>
      {photos.length < props.resto.photos.length && (
        <button
          className="my-2 bg-btn-red"
          onClick={() => setSeeAllPhotos(true)}
        >
          See all photo
        </button>
      )}
      <div className={classes.reviews}>
        {reviews.map((r: any) => (
          <div key={r.id} className={classes.reviewsWrapper}>
            <img
              className={classes.reviewsImage}
              src={r.user.profile_image}
              alt={r.user.name}
            />
            <div className={classes.reviewsInfo}>
              <h3>{r.user.name}</h3>
              <p>{r.review_text}</p>
            </div>
          </div>
        ))}
      </div>
      {reviews.length > 0 && (
        <button className="my-2 bg-btn-red" onClick={() => setStart(start + 3)}>
          Show more review
        </button>
      )}
    </div>
  );
};

export default RestoDetail;
