import React from 'react';
import Icon from '@mdi/react';
import { mdiStar, mdiStarOutline } from '@mdi/js';
import classes from './index.module.css';

interface Props {
  ratings: any[];
  onChange(ratings: any[]): any;
}

const FilterRating = (props: Props) => {
  const star2 = [1, 2];
  const star3 = [1, 2, 3];
  const star4 = [1, 2, 3, 4];
  const star5 = [1, 2, 3, 4, 5];
  return (
    <div className={classes.rating}>
      <p>Filter Rating:</p>
      <span
        className={props.ratings.includes(1) ? classes.selected : ''}
        onClick={() => {
          if (props.ratings.includes(1)) {
            props.onChange(props.ratings.filter((r) => r !== 1));
          } else {
            props.onChange([...props.ratings, 1]);
          }
        }}
      >
        <Icon size={1} path={mdiStar} />
        {star4.map((s) => (
          <Icon key={s} size={1} path={mdiStarOutline} />
        ))}
      </span>
      <span
        className={props.ratings.includes(2) ? classes.selected : ''}
        onClick={() => {
          if (props.ratings.includes(2)) {
            props.onChange(props.ratings.filter((r) => r !== 2));
          } else {
            props.onChange([...props.ratings, 2]);
          }
        }}
      >
        {star2.map((s) => (
          <Icon key={s} size={1} path={mdiStar} />
        ))}
        {star3.map((s) => (
          <Icon key={s} size={1} path={mdiStarOutline} />
        ))}
      </span>
      <span
        className={props.ratings.includes(3) ? classes.selected : ''}
        onClick={() => {
          if (props.ratings.includes(3)) {
            props.onChange(props.ratings.filter((r) => r !== 3));
          } else {
            props.onChange([...props.ratings, 3]);
          }
        }}
      >
        {star3.map((s) => (
          <Icon key={s} size={1} path={mdiStar} />
        ))}
        {star2.map((s) => (
          <Icon key={s} size={1} path={mdiStarOutline} />
        ))}
      </span>
      <span
        className={props.ratings.includes(4) ? classes.selected : ''}
        onClick={() => {
          if (props.ratings.includes(4)) {
            props.onChange(props.ratings.filter((r) => r !== 4));
          } else {
            props.onChange([...props.ratings, 4]);
          }
        }}
      >
        {star4.map((s) => (
          <Icon key={s} size={1} path={mdiStar} />
        ))}
        <Icon size={1} path={mdiStarOutline} />
      </span>
      <span
        className={props.ratings.includes(5) ? classes.selected : ''}
        onClick={() => {
          if (props.ratings.includes(5)) {
            props.onChange(props.ratings.filter((r) => r !== 5));
          } else {
            props.onChange([...props.ratings, 5]);
          }
        }}
      >
        {star5.map((s) => (
          <Icon key={s} size={1} path={mdiStar} />
        ))}
      </span>
    </div>
  );
};

export default FilterRating;
