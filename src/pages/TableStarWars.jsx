import React, { useContext } from 'react';
import { StarWarsContext } from '../context';

function TableStarWars() {
  const {
    filterData,
    setName,
    handleFilters,
    setColumn,
    setComparison,
    setValue,
    numericFilters,
    value: valueNumber,
  } = useContext(StarWarsContext);

  const showParameters = () => numericFilters.map(({ column, comparison, value }, i) => (
    <ul key={ i }>
      <li>{column}</li>
      <li>{comparison}</li>
      <li>{value}</li>
    </ul>
  ));
  console.log(numericFilters[0].column);
  console.log(showParameters());
  return (
    <>
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
