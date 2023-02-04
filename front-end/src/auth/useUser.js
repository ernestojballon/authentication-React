import { useState, useEffect } from 'react';
import { getUserById } from '../services/user.service';
import { useToken } from './useToken';

const getUserFromToken = async (token) => {
    if (!token.split('.')[1]) return {};
    const payload = token.split('.')[1];

    // buffer to string
    const payloadString = Buffer.from(payload, 'base64');
    const payloadObject = JSON.parse(payloadString);
    const { id } = payloadObject;
    const user = await getUserById(id);
    return user;
};
export const useUser = () => {
    const { token } = useToken();

    const [user, setUser] = useState(token ? getUserFromToken(token) : null);
    useEffect(() => {
        if (token) {
            return getUserFromToken(token).then((userInfo) =>
                setUser(userInfo)
            );
        }
        return setUser(null);
    }, [token]);

    return [user, setUser];
};
