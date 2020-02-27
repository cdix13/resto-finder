import React from 'react';
import Icon from '@mdi/react';
import {
  mdiStarCircle,
  mdiLocationEnter,
  mdiCommentOutline,
  mdiStar,
} from '@mdi/js';
import classes from './index.module.css';
import { RestoProps } from '../types';

interface Props {
  resto: RestoProps;
  onClick(): any;
}
const RestoCard = (props: Props) => {
  return (
    <div onClick={props.onClick} className={classes.wrapper}>
      <img
        className={classes.image}
        src={props.resto.thumb}
        alt={props.resto.name}
      />
      <div className={classes.info}>
        <div className={classes.title}>
          <h3>{props.resto.name}</h3>
          <p>
            <Icon size={0.7} path={mdiLocationEnter} />{' '}
            {props.resto.location.locality}{' '}
            <Icon size={0.7} path={mdiStarCircle} />{' '}
            {props.resto.establishment[0]}
          </p>
        </div>
        <p className={classes.body}>{props.resto.cuisines}</p>
        <div className={classes.footer}>
          <p>
            <Icon size={0.7} path={mdiCommentOutline} />{' '}
            {props.resto.all_reviews_count} Reviews
          </p>
          <p>
            <Icon size={0.7} path={mdiStar} />{' '}
            {props.resto.user_rating.aggregate_rating}/5
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
