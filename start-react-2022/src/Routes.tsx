import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Card } from './pages/Card';
import { Catalog } from './pages/Catalog';

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/card' element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}
