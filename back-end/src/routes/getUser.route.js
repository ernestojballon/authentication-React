import { queryUserById } from '#Services/database.service';
import asyncErrorHandler from '#Utils/asyncErrorHandler';
import CustomError from '#Utils/customError';
import { authenticateMiddleware } from '#Middlewares/index';

export default {
    path: '/api/user/:id',
    method: 'get',
    middleware: [authenticateMiddleware],
    handler: asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new CustomError(400, 'Id is required');
        }
        let user;
        try {
            user = await queryUserById(id);
            const userToReturn = (({ _id, email, info, wasVerified }) => ({
                id: _id,
                email,
                info,
                wasVerified,
            }))(user);

            return res.status(200).send(userToReturn);
        } catch (err) {
            throw new CustomError(401, 'Cannot retrieve user');
        }
    }),
};
