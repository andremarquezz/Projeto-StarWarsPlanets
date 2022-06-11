import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = { data: [] };
export const StarWarsContext = createContext(INITIAL_STATE);

export function ProviderContext({ children }) {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [columnSort, setColumnSort] = useState('population');
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

  const handleSort = (id) => {
    const unknown = filterData.filter(
      (planet) => planet[columnSort] === 'unknown',
    );
    const dataSort = filterData
      .sort((a, b) => {
        if (id === 'ASC') {
          return +a[columnSort] - +b[columnSort];
        }
        return +b[columnSort] - +a[columnSort];
      })
      .filter((planet) => planet[columnSort] !== 'unknown');
    setFilterData([...dataSort, ...unknown]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await (await fetch(api)).json();
      setData(results);
      setFilterData(results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dataFilter = data.filter((planet) => planet.name.toLowerCase().includes(name));
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
      dataFilter,
    );
    setFilterData(result);
  }, [name, numericFilters, data]);

  const valueContext = {
    data,
    filterData,
    handleFilters,
    value,
    numericFilters,
    setName,
    setColumn,
    setColumnSort,
    handleSort,
    setComparison,
    setValue,
    setNumericFilters,
  };

  return (
    <StarWarsContext.Provider value={ valueContext }>
      {children}
    </StarWarsContext.Provider>
  );
}
ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
