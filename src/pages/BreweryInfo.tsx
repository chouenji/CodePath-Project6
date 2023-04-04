import { useParams } from 'react-router-dom';
import { Brewery } from '../types/Brewery';
import { useEffect, useState } from 'react';

export default function BreweryInfo() {
  const { id } = useParams<{ id: string }>();
  const [brewery, setBrewery] = useState<Brewery>();

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
      <h1>{brewery?.name}</h1>
      <h1>{brewery?.brewery_type}</h1>
      <h1>{brewery?.street}</h1>
      <h1>{brewery?.state}</h1>
      <h1>{brewery?.postal_code}</h1>
      <h1>{brewery?.country}</h1>
      <h1>{brewery?.phone}</h1>
      <h1>{brewery?.website_url}</h1>
    </div>
  );
}
