import React from 'react';
import { Link } from 'react-router-dom';
import { useToken } from '../../auth/useToken';
import { styles } from './styles';

export default function Navbar() {
    const { token, deleteToken } = useToken();
    const logout = () => {
        deleteToken();
    };
    return (
        <div css={styles.navbarContainer}>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/update">Update</Link>
            <Link to="/getuser">Get User</Link>
            {token && (
                <button type="button" onClick={logout}>
                    Logout
                </button>
            )}
        </div>
    );
}
