import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dictionary from './pages/index';
import React from 'react';
import StarredWords from './pages/favorites';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dictionary />} />
          <Route path="/favorites" element={<StarredWords />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
