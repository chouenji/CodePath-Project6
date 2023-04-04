import './App.css';
import Header from './components/Header';
import List from './components/List';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BreweryInfo from './pages/BreweryInfo';

export default function App() {
  return (
    <div className="App bg-zinc-800">
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/breweries/:id" element={<BreweryInfo />} />
      </Routes>
    </div>
  );
}
