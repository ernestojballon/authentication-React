import { queryUserByEmail } from '#Services/database.service';
import { createToken } from '#Services/token.service';
import asyncErrorHandler from '#Utils/asyncErrorHandler';
import CustomError from '#Utils/customError';
import { compare } from '#Services/encrypt.service';

export default {
    path: '/api/login',
    method: 'post',
    handler: asyncErrorHandler(async (req, res) => {
        const { email, password } = req.body;
        // if email or password is missing, return error
        if (!email || !password) {
            throw new CustomError(400, 'Email and password are required');
        }
        let user;
        try {
            user = await queryUserByEmail(email);
            await compare(password, user.passwordHash);
        } catch (err) {
            throw new CustomError(401, 'Email or password is incorrect');
        }
        const token = await createToken({
            id: user._id,
            email: user.email,
            info: user.info,
            wasVerified: user.wasVerified,
        });
        console.log(`User ${user._id} logged in`);
        return res.status(200).send({ token });
    }),
};
