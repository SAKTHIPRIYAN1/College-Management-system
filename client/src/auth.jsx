import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(() => {
        
        const authStatus = sessionStorage.getItem('auth');
        return authStatus === 'true'; 
    });

    useEffect(() => {
        
        sessionStorage.setItem('auth', isLoggedIn);
    }, [isLoggedIn]);

    const login = () => {
        console.log('Logging in...');
        setLoggedIn(true);
    };

    const logout = () => {
        console.log('Logging out...');
        setLoggedIn(false);
        sessionStorage.clear();
        navigate('/loginpage');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
