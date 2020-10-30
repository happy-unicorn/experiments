import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css';
import { getRoutes } from './utils/getRoutes';
import {useAuth} from './hooks/useAuth';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

const App = () => {
    const { login, logout, token, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = getRoutes(isAuthenticated);

    if (!ready) {
        return <Loader/>
    }
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