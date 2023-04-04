import Navbar from './Navbar';

export default function Header() {
  return (
    <div className="Header flex bg-sky-800 text-white items-center ">
      <div className="flex items-center p-3">
        <img width={80} src="logo.png" alt="logo" />
        <h1 className="font-bold ml-2 text-lg">BrewFinder</h1>
      </div>
      <Navbar />
    </div>
  );
}
