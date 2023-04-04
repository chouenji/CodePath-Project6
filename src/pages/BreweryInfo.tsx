import { useNavigate, useParams } from 'react-router-dom';
import { Brewery } from '../types/Brewery';
import { useEffect, useState } from 'react';

export default function BreweryInfo() {
  const { id } = useParams<{ id: string }>();
  const [brewery, setBrewery] = useState<Brewery>();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  const fetchBrewery = async () => {
    const response = await fetch(
      `https://api.openbrewerydb.org/v1/breweries/${id}`
    );
    const data = await response.json();
    console.log(data);
    setBrewery(data);
  };

  useEffect(() => {
    fetchBrewery();
  }, []);

  return (
    <div className="text-white text-center">
      <h1>Name: {brewery?.name}</h1>
      <h1>Type: {brewery?.brewery_type}</h1>
      <h1>Street: {brewery?.street}</h1>
      <h1>State: {brewery?.state}</h1>
      <h1>Postal Code: {brewery?.postal_code}</h1>
      <h1>Country: {brewery?.country}</h1>
      <h1>Phone: {brewery?.phone}</h1>
      <h1>URL: {brewery?.website_url}</h1>
      <button
        className="bg-yellow-800 text-bold p-2 m-10"
        onClick={handleRedirect}
      >
        Go Back
      </button>
    </div>
  );
}
