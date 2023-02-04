import { Redirect } from 'react-router-dom';
import { httpCall } from './http.service';

const loginUser = async ({ email, password }) => {
    try {
        const response = await httpCall('post', 'api/login', {
            email,
            password,
        });
        const { token } = response.data;
        return token;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error('Invalid username or password');
        }
        throw new Error('Error logging in');
    }
};

const getUserById = async (id) => {
    try {
        const response = await httpCall('get', `api/user/${id}`);
        const user = response.data;
        return user;
    } catch (error) {
        // redirect to login page
        window.location.href = '/login';
        return null;
    }
};

const updateUserById = async ({ id, userInfo }) => {
    try {
        const response = await httpCall('put', `api/update/${id}`, userInfo);
        const user = response.data;
        return user;
    } catch (error) {
        // redirect to login page
        window.location.href = '/login';
        return null;
    }
};

const signUpUser = async ({ email, password }) => {
    try {
        const response = await httpCall('post', 'api/signup', {
            email,
            password,
        });
        const { token } = response.data;
        return token;
    } catch (error) {
        throw new Error('Error Registering the user');
    }
};

const verifyToken = async () => {
    try {
        const response = await httpCall('post', 'api/verifytoken');
        const { valid } = response.data;
        return valid;
    } catch (error) {
        window.location.href = '/login';
        return null;
    }
};

export { loginUser, getUserById, updateUserById, signUpUser, verifyToken };
