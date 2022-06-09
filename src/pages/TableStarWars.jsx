import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context';

function TableStarWars() {
  const [options, setOptions] = useState();
  const [optionsFilter, setOptionsFilter] = useState();

  useEffect(() => {
    const valuesOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setOptions(valuesOptions);
    setOptionsFilter(valuesOptions);
  }, []);

  const {
    filterData,
    handleFilters,
    numericFilters,
    setName,
    setColumn,
    setComparison,
    setValue,
    setNumericFilters,
    value: valueNumber,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const handleOptions = () => {
      const optionsFiltered = numericFilters.reduce(
        (acc, { column }) => acc.filter((option) => option !== column),
        options,
      );
      setOptionsFilter(optionsFiltered);
    };
    handleOptions();
  }, [numericFilters, options]);

  const deleteFilter = (index) => {
    setNumericFilters(
      numericFilters.filter((_param, paramIndex) => index !== paramIndex),
    );
  };

  const showParameters = () => numericFilters.map(({ column, comparison, value }, i) => (
    <div key={ i }>
      <ul>
        <li>{column}</li>
        <li>{comparison}</li>
        <li>{value}</li>
      </ul>
      <button type="button" onClick={ () => deleteFilter(i) }>
        delete
      </button>
    </div>
  ));

  return (
    <>
      {showParameters()}
      <form>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Procure pelo nome"
          onChange={ ({ target: { value } }) => setName(value) }
        />
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            {optionsFilter.map((option, i) => (
              <option key={ i } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="operator">
          <select
            name="operator"
            id="operator"
            data-testid="comparison-filter"
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          value={ valueNumber }
          type="number"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setValue(value) }
        />
        <button type="button" data-testid="button-filter" onClick={ handleFilters }>
          Pesquisar
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Create</th>
            <th>Edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map(
            ({
              name,
              rotation_period: rotation,
              orbital_period: orbital,
              diameter,
              gravity,
              terrain,
              surface_water: surface,
              population,
              films,
              created,
              climate,
              edited,
              url,
            }) => (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotation}</td>
                <td>{orbital}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surface}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableStarWars;
