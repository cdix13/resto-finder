import React, { useState } from 'react';
import classes from './index.module.css';

interface Props {
  lists: string[];
  onChange(list: string): any;
  selected: string;
}

const Dropdown = (props: Props) => {
  const [showList, setShowList] = useState(false);
  return (
    <div className={classes.dropdown}>
      <button
        onClick={() => setShowList(!showList)}
        className={classes.dropbtn}
      >
        {props.selected || 'Dropdown'}
      </button>
      {showList && (
        <div className={classes.dropdownContent}>
          {props.lists.map((list) => (
            <span
              key={list}
              style={{
                cursor: props.selected === list ? 'default' : 'pointer',
              }}
              onClick={() => {
                if (props.selected === list) {
                  return;
                }
                setShowList(false);
                props.onChange(list);
              }}
            >
              {list}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
