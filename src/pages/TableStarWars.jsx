import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context';

function TableStarWars() {
  const valuesOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [options] = useState(valuesOptions);
  const [optionsFilter, setOptionsFilter] = useState(valuesOptions);

  const {
    filterData,
    handleFilters,
    numericFilters,
    setName,
    setColumn,
    setColumnSort,
    handleSort,
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

  const deleteFilters = () => {
    setOptionsFilter(options);
    setNumericFilters([]);
  };

  return (
    <>
      <table>
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Type Filter
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Comparison
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {numericFilters.map(({ column, comparison, value }, i) => (
            <tr key={ i }>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {column}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {comparison}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {value}
              </td>
              <button
                type="button"
                onClick={ () => deleteFilter(i) }
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="my-2">
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Search by name"
          onChange={ ({ target: { value } }) => setName(value) }
          className="
          mx-1
        px-3
        py-1.5
        text-sm
        font-normal
        text-gray-700Procure através do  nome
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
        />
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ ({ target: { value } }) => setColumn(value) }
            className="
               mx-1
    appearance-none
    w-35
    px-1
    py-1
    text-sm
    font-normal
    text-gray-700
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
            className="
               mx-1
    appearance-none
    w-35
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="operator"
            id="operator"
            data-testid="comparison-filter"
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            <option value="greater than">greater than</option>
            <option value="smaller than">smaller than</option>
            <option value="equal to">equal to</option>
          </select>
        </label>
        <input
          className=" px-3
             mx-1
          w-13
        py-1
        text-sm
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          value={ valueNumber }
          placeholder="0"
          type="number"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setValue(value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilters }
          className="px-3 py-2 bg-blue-600 text-white font-medium text-xs uppercase rounded hover:bg-blue-700 hover:shadow-lg"
        >
          Search
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ deleteFilters }
          className="  px-3 py-2 bg-blue-600 text-white font-medium text-xs uppercase rounded hover:bg-blue-700 hover:shadow-lg mx-1"
        >
          remove all filters
        </button>
        <label htmlFor="columnSort">
          Order by:
          <select
            className="
            mx-1
    appearance-none
    w-35
    px-1
    py-1
    text-sm
    font-normal
    text-gray-700
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="columnSort"
            id="columnSort"
            onChange={ ({ target: { value } }) => setColumnSort(value) }
          >
            {options.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="sortIn"
          onChange={ ({ target: { id } }) => handleSort(id) }
        >
          Sort In:
          <input type="radio" name="sortIn" id="ASC" className="mx-1 " />
          Ascending order
          <input type="radio" name="sortIn" id="DESC" className="mx-1" />
          Descending order
        </label>
      </form>

      <table>
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Rotation Period
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Orbital Period
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Diameter
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Climate
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Gravity
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Terrain
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Surface Water
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Population
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Films
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Create
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              Edited
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center">
              url
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
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
              <tr key={ name } className="bg-white">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {rotation}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {orbital}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {diameter}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {climate}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {gravity}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {terrain}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {surface}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {population}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {films}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {created}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {edited}
                </td>
                <td className="font-bold text-blue-500 hover:underline">
                  {url}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
export default TableStarWars;
