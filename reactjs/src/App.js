import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getRoutes } from './utils/getRoutes';

const App = () => {
    const routes = getRoutes();
    return (
        <BrowserRouter>
            <div className="container">
                { routes }
            </div>
        </BrowserRouter>
  );
};

export default App;