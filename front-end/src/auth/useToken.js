import { useState } from 'react';

export const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString;
        return userToken;
    };
    const [token, setToken] = useState(getToken());

    const saveToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };
    const deleteToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return {
        setToken: saveToken,
        token,
        deleteToken,
    };
};
