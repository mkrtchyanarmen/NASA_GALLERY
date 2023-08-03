import Home from '@pages/Home';
import Media from '@pages/Media';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={Media} path="/media/:nasa_id" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
