import { useEffect, useState } from 'react';
import Card from './Card';
import { Brewery } from '../types/Brewery';
import Chart from './Chart';
import { Link, useNavigate } from 'react-router-dom';
import BreweryInfo from '../pages/BreweryInfo';

export default function List() {
  const [breweries, setBreweries] = useState<Brewery[]>();
  const [filteredBreweries, setFilteredBreweries] = useState<Brewery[]>([]);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery>();
  const navigate = useNavigate();

  const handleRedirect = (id: string) => {
    console.log(`Selected brewery with id ${id}`);
    const brewery = breweries?.find((brewery) => brewery.id === id);
    setSelectedBrewery(brewery);
  };

  const getBreweries = async () => {
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
    const data = await response.json();
    setBreweries(data);
    setFilteredBreweries(data);
    let randomBrewery = data[Math.floor(Math.random() * data.length)];
    setSelectedBrewery(randomBrewery);
  };

  const filterBreweries = (searchText: string, filterOption: string) => {
    if (breweries) {
      let filtered: Brewery[] = [];
      switch (filterOption) {
        case 'city':
          filtered = breweries.filter((brewery) =>
            brewery.country.toLowerCase().includes(searchText.toLowerCase())
          );
          break;
        case 'state':
          filtered = breweries.filter((brewery) =>
            brewery.state.toLowerCase().includes(searchText.toLowerCase())
          );
          break;
        case 'country':
          filtered = breweries.filter((brewery) =>
            brewery.country.toLowerCase().includes(searchText.toLowerCase())
          );
          break;
        case 'type':
          filtered = breweries.filter((brewery) =>
            brewery.brewery_type
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
          break;
        default:
          filtered = breweries.filter((brewery) =>
            brewery.name.toLowerCase().includes(searchText.toLowerCase())
          );
          break;
      }
      setFilteredBreweries(filtered);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearch(searchText);
    filterBreweries(searchText, selectedFilter);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterOption = e.target.value;
    setSelectedFilter(filterOption);
    filterBreweries(search, filterOption);
  };

  useEffect(() => {
    getBreweries();
  }, []);

  console.log(breweries);

  return (
    <div className="List text-white">
      <div className="header w-80 mx-auto">
        <h1 className="text-center font-bold text-2xl mb-3">
          List of Breweries
        </h1>
        <div className="flex">
          <input
            onChange={handleSearch}
            className="w-full p-2 font-bold text-black"
            type="text"
            placeholder="Search"
          />
          <select
            className="p-2 ml-2 text-black "
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
            <option value="country">Country</option>
            <option value="type">Brewery Type</option>
          </select>
        </div>
      </div>
      {selectedBrewery && (
        <>
          <h1 className="font-bold text-2xl text-center mt-10">
            Random Brewery Chosen For You
          </h1>
          <Card brewery={selectedBrewery} />
        </>
      )}
      <div className="flex p-10">
        <table className="w-full border-2 text-center">
          <thead>
            <tr>
              <th className="border-y-2">Name</th>
              <th className="border-y-2">Type</th>
              <th className="border-y-2">City</th>
              <th className="border-y-2">State</th>
              <th className="border-y-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreweries.map((brewery) => (
              <tr key={brewery.id}>
                <td className="border-y">
                  <div onClick={() => handleRedirect(brewery.id)}>
                    <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
                  </div>
                </td>
                <td className="border-y">{brewery.brewery_type}</td>
                <td className="border-y">{brewery.country}</td>
                <td className="border-y">{brewery.state}</td>
                <td className="border-y">{brewery.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Chart data={breweries} />
    </div>
  );
}
