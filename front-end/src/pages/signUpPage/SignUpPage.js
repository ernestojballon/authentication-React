import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUpUser } from '../../services/user.service';
import { styles } from './styles';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const onSignUp = async () => {
        try {
            await signUpUser({
                email,
                password,
            });
            history.push('/login');
        } catch (err) {
            console.error('Error from login', err);
            setError(err.message);
        }
    };

    return (
        <div className="content-container">
            <h1>Sign Up Page</h1>
            {error && <p className="fail">{error}</p>}
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="confirm Password"
            />
            <hr />
            <button
                type="submit"
                disabled={!email || !password || password !== confirmPassword}
                onClick={onSignUp}
            >
                Create Account
            </button>
            <button
                type="button"
                onClick={() => {
                    history.push('/login');
                }}
            >
                Already have an account. Log In
            </button>
        </div>
    );
}

export default SignUpPage;
