import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import './App.css';
import axios from './axios';
import Autocomplete from './components/Autocomplete';
import RestoCard from './components/RestoCard';
import Dropdown from './components/Dropdown';
import FilterRating from './components/FilterRating';
import RestoDetail from './components/RestoDetail';

function App() {
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [ratings, setRatings] = useState<number[]>([]);
  const [sort, setSort] = useState('Rating');
  const [order, setOrder] = useState('asc');
  const [cityId, setCityId] = useState('');
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurant, setRestaurant] = useState();
  const [total, setTotal] = useState(0);
  const count = 12;

  useEffect(() => {
    if (cityId) {
      if (sort === 'Rating') {
        _fetchRestaurants();
      } else {
        let filtered = [...restaurants];
        if (sort === 'Name') {
          filtered = filtered.sort((a, b) => {
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (order === 'desc') {
              nameA = b.name.toUpperCase(); // ignore upper and lowercase
              nameB = a.name.toUpperCase(); // ignore upper and lowercase
            }
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
        }
        if (sort === 'Review') {
          filtered = filtered.sort((a, b) => {
            if (order === 'asc') {
              return a.all_reviews_count - b.all_reviews_count;
            }
            return b.all_reviews_count - a.all_reviews_count;
          });
        }

        setRestaurants(filtered);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, start, order, sort, ratings]);

  const _fetchCities = async (q: string) => {
    if (q) {
      try {
        const { data } = await axios.get(`/cities?q=${q}&count=20`);
        setCities(data.location_suggestions);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const _fetchRestaurants = async () => {
    setCities([]);
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/search?entity_id=${cityId}&entity_type=city&start=${start}&count=${count}&sort=${sort.toLowerCase()}&order=${order}`,
      );
      let results =
        start === 0
          ? data.restaurants.map((res: any) => res.restaurant)
          : [
              ...restaurants,
              ...data.restaurants.map((res: any) => res.restaurant),
            ];

      if (ratings.length > 0) {
        results = results.filter((f: any) =>
          ratings.includes(Math.round(f.user_rating.aggregate_rating)),
        );
      }

      setLoading(false);
      setRestaurants(results);
      setTotal(data.results_found);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Restaurant Finder</h1>
      </header>
      {restaurant ? (
        <RestoDetail resto={restaurant} goBack={() => setRestaurant('')} />
      ) : (
        <>
          <main>
            <div className="sidebar">
              <Autocomplete
                suggestions={cities}
                onChange={(q) => _fetchCities(q)}
                onSelect={(cityId) => setCityId(cityId)}
              />
              {restaurants.length > 0 && (
                <>
                  <FilterRating
                    ratings={ratings}
                    onChange={(ratings) => setRatings(ratings)}
                  />
                  <div className="filter">
                    <p>Sort:</p>
                    <Dropdown
                      selected={sort}
                      lists={['Rating', 'Review', 'Name']}
                      onChange={(sort) => setSort(sort)}
                    />
                  </div>
                  <div className="filter">
                    <p>Order:</p>
                    <button
                      onClick={() => {
                        setStart(0);
                        setOrder('asc');
                      }}
                      className={order === 'asc' ? 'sort-active' : ''}
                    >
                      ASC
                    </button>
                    <button
                      onClick={() => {
                        setStart(0);
                        setOrder('desc');
                      }}
                      className={order === 'desc' ? 'sort-active' : ''}
                    >
                      DESC
                    </button>
                  </div>
                  <div className="info">
                    <p>Total Resto: {total} </p>
                    <p>Total Shown: {restaurants.length}</p>
                  </div>
                </>
              )}
            </div>
            <div className="content">
              {restaurants.map((res: any) => (
                <RestoCard
                  key={res.id}
                  resto={res}
                  onClick={() => setRestaurant(res)}
                />
              ))}
            </div>
          </main>
          <div className="action">
            {restaurants.length === 0 ? (
              <p>Please enter city first</p>
            ) : loading ? (
              <Icon spin size={3} path={mdiLoading} />
            ) : (
              <button
                className="bg-btn-red"
                onClick={() => setStart(start + count)}
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
