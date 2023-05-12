import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dictionary from './pages/Dictionary';
import React from 'react';
import ReactDOM from 'react-dom';
import StarredWords from './pages/StarredWords';

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

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
