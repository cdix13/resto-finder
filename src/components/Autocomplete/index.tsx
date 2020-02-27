import React, { useState } from 'react';
import classes from './index.module.css';

interface Props {
  suggestions: any[];
  onChange(q: string): any;
  onSelect(q: string): any;
}

const Autocomplete = (props: Props) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  const _onChange = (e: any) => {
    const q = e.target.value;
    if (q) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setUserInput(q);
    props.onChange(q);
  };

  const _onKeyDown = (e: React.KeyboardEvent) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      const city = props.suggestions[activeSuggestion];
      if (city) {
        props.onSelect(city.id);
        setUserInput(city.name);
        setActiveSuggestion(0);
        setShowSuggestions(false);
      }
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === props.suggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const _onClick = (e: any, cityId: string) => {
    props.onSelect(cityId);
    setUserInput(e.currentTarget.innerText);
    setShowSuggestions(false);
  };

  return (
    <div className={classes.wrapper}>
      <input
        placeholder="Search city here..."
        className={classes.input}
        type="text"
        onChange={_onChange}
        onKeyDown={_onKeyDown}
        value={userInput}
      />
      {showSuggestions &&
        (props.suggestions.length > 0 ? (
          <ul className={classes.suggestions}>
            {props.suggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = classes.suggestionActive;
              }

              return (
                <li
                  className={className}
                  key={suggestion.id}
                  onClick={(e) => _onClick(e, suggestion.id)}
                >
                  {suggestion.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={classes.noSuggestions}>
            <em>No suggestions, you're on your own!</em>
          </div>
        ))}
    </div>
  );
};

Autocomplete.defaultProps = {
  suggestions: [],
};

export default Autocomplete;
