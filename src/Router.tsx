import Home from '@pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
