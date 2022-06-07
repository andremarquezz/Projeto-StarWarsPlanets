import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = { data: [] };
export const StarWarsContext = createContext(INITIAL_STATE);

export function ProviderContext({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await (await fetch(api)).json();
      setData(results);
      setDataFilter(results);
    };
    fetchData();
  }, []);
  const valueContext = {
    data,
    dataFilter,
  };

  return (
    <StarWarsContext.Provider value={ valueContext }>{children}</StarWarsContext.Provider>
  );
}
ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
