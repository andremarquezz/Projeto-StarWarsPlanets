import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = { data: [] };
export const StarWarsContext = createContext(INITIAL_STATE);

export function ProviderContext({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [numericFilters, setNumericFilters] = useState([]);

  const handleFilters = () => {
    const newNumericFilters = {
      column,
      comparison,
      value,
    };
    setNumericFilters([...numericFilters, newNumericFilters]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await (await fetch(api)).json();
      setData(results);
      setfilterData(results);
    };
    fetchData();
    // handleFilters();
  }, []);

  useEffect(() => {
    const xab = data.filter((planet) => planet.name.toLowerCase().includes(name));
    console.log(xab);
    const result = numericFilters.reduce(
      (acc, filter) => acc.filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(planet[filter.column]) < Number(filter.value);
        case 'igual a':
          return Number(planet[filter.column]) === Number(filter.value);
        default:
          return false;
        }
      }),
      xab,
    );
    setfilterData(result);
  }, [name, numericFilters, data]);

  const valueContext = {
    data,
    filterData,
    setName,
    handleFilters,
    setColumn,
    setComparison,
    setValue,
    numericFilters,
    value,
  };

  return (
    <StarWarsContext.Provider value={ valueContext }>{children}</StarWarsContext.Provider>
  );
}
ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
