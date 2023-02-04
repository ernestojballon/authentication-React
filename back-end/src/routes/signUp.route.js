import { checkIfUserExists, insertOneUser } from '#Services/database.service';
import CustomError from '#Utils/customError';
import { hash } from '#Services/encrypt.service';
import { createToken } from '#Services/token.service';
import asyncErrorHandler from '#Utils/asyncErrorHandler';

export default {
    path: '/api/signup',
    method: 'post',
    handler: asyncErrorHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await checkIfUserExists(email);
        if (user) {
            throw new CustomError(422, 'Email is in use');
        }
        // Hash password
        const passwordHash = await hash(password);
        const startingUserInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };
        const { resultId } = await insertOneUser({
            email,
            passwordHash,
            info: startingUserInfo,
            wasVerified: false,
        });

        const token = await createToken({
            id: resultId,
            email,
            info: startingUserInfo,
            wasVerified: false,
        });
        return res.status(200).send({ token });
    }),
};
