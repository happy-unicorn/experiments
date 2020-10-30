import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import { getRoutes } from './utils/getRoutes';
import {useAuth} from './hooks/useAuth';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';

const App = () => {
    const { login, logout, token, userId } = useAuth();
    const isAuthenticated = !!token;
    const routes = getRoutes(isAuthenticated);
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <BrowserRouter>
                {isAuthenticated && <NavBar/>}
                <div className="container">
                    { routes }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
  );
};

export default App;