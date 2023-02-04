/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useToken } from './useToken';

export function PrivateRoute({ component: Component, ...rest }) {
    const { token } = useToken();

    if (!token) {
        console.log('redirecting to login');
        return <Redirect to="/login" />;
    }
    return <Route {...rest} render={(props) => <Component {...props} />} />;
}
