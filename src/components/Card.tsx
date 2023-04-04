import { Brewery } from '../types/Brewery';

export default function Card({ brewery }: { brewery: Brewery }) {
  return (
    <div className="Card mt-4 w-96 h-22 mx-auto flex flex-col bg-white rounded-lg shadow-lg p-4 text-black">
      <div className="flex justify-between text-center">
        <h2 className="font-bold text-xl">{brewery.name}</h2>
        <p className="text-sm">{brewery.brewery_type}</p>
      </div>
      <p className="text-sm">{brewery.street}</p>
      <p className="text-sm">
        {brewery.country}, {brewery.state} {brewery.postal_code}
      </p>
      <p className="text-sm">{brewery.country}</p>
      <p className="text-sm">{brewery.phone}</p>
      <p className="text-sm">{brewery.website_url}</p>
    </div>
  );
}
