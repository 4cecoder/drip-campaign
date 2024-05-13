// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../lib/api';

interface AuthContextData {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            API.setAuthToken(token);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const response = await API.adminLogin({ username, password });
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            API.setAuthToken(response.token);
            setIsAuthenticated(true);
        } else {
            throw new Error('Login failed! Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        API.setAuthToken('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};