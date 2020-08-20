import React, { useState, useEffect } from 'react';

import filterStyles from './styles/filter.module.scss';
import { Redirect } from 'react-router-dom';

const yearsArr = [
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020
];

const boolArr = ['true', 'false'];

const Filters = props => {
  const [filter, setFilter] = useState({
    launch_year: undefined,
    launch_success: undefined,
    land_success: undefined
  });
  const [filterStr, setFilterStr] = useState('-1');

  const handleFilter = (name, e) => {
    if (e.target.id !== filter[name]) {
      setFilter({ ...filter, [name]: e.target.id });
    } else {
      setFilter({ ...filter, [name]: undefined });
    }
  };

  useEffect(() => {
    let str = '';
    Object.entries(filter).map(entry => {
      if (entry[1] != undefined) {
        str += '&' + entry[0] + '=' + entry[1];
      }
    });
    setFilterStr(str);
  }, [filter]);

  return (
    <>
      {filterStr !== '-1' ? <Redirect to={`/${filterStr}`} /> : null}
      <div className={filterStyles.filterSec}>
        <h3 className={filterStyles.secTitle}>Filters</h3>
        <div className={filterStyles.subTitle}>Launch Year</div>
        <ul
          className={filterStyles.filterBtn}
          onClick={e => handleFilter('launch_year', e)}
        >
          {yearsArr.map(year => (
            <li
              key={year}
              id={year}
              className={
                year == filter.launch_year ? filterStyles.selected : ''
              }
            >
              {year}
            </li>
          ))}
        </ul>
        <div className={filterStyles.subTitle}>Successful Launch</div>
        <ul
          className={filterStyles.filterBtn}
          onClick={e => handleFilter('launch_success', e)}
        >
          {boolArr.map(bool => (
            <li
              key={bool}
              id={bool}
              className={
                bool == filter.launch_success ? filterStyles.selected : ''
              }
            >
              {bool}
            </li>
          ))}
        </ul>
        <div className={filterStyles.subTitle}>Successful Land</div>
        <ul
          className={filterStyles.filterBtn}
          onClick={e => handleFilter('land_success', e)}
        >
          {boolArr.map(bool => (
            <li
              key={bool}
              id={bool}
              className={
                bool == filter.land_success ? filterStyles.selected : ''
              }
            >
              {bool}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Filters;
