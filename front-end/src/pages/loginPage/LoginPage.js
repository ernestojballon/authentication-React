import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useToken } from '../../auth/useToken';
import { loginUser, verifyToken } from '../../services/user.service';
import { styles } from './styles';

function LoginPage() {
    const { token, setToken, deleteToken } = useToken();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const history = useHistory();

    const signIn = async () => {
        try {
            const _token = await loginUser({
                email: email,
                password,
            });
            setToken(_token);
            history.push('/');
        } catch (err) {
            console.error('error from login', err);
            setError(err.message);
        }
    };
    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                const tokenvalid = await verifyToken();
                if (tokenvalid) {
                    return history.push('/');
                }
                return deleteToken();
            }
            return null;
        };
        validateToken().catch((err) => {
            console.error('error from validate token', err);
            setError(err.message);
        });
    }, []);
    return (
        <div css={styles.loginContainer}>
            <div className="content-container">
                <h1>Login Page</h1>
                {error && <p className="fail">{error}</p>}
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <hr />
                <button
                    type="submit"
                    disabled={!email || !password}
                    onClick={signIn}
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => {
                        history.push('/resetPass');
                    }}
                >
                    Forgot your password
                </button>
                <button type="button" onClick={() => history.push('/signup')}>
                    Don&apos;t have an account. Sign Up
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
