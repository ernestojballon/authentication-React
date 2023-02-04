import CustomError from '#Utils/customError';
import asyncErrorHandler from '#Utils/asyncErrorHandler';
import { getAndUpdateUserById } from '#Services/database.service';
import { authenticateMiddleware } from '#Middlewares/index';

export default {
    path: '/api/update/:id',
    method: 'put',
    middleware: [authenticateMiddleware],
    handler: asyncErrorHandler(async (req, res) => {
        const { id } = req.params;
        if (!id) {
            throw new CustomError(400, 'Id is required');
        }
        const updates = (({ hairColor, favoriteFood, bio }) => ({
            hairColor,
            favoriteFood,
            bio,
        }))(req.body);

        const userInfo = await getAndUpdateUserById({ id, userInfo: updates });

        return res.status(200).send({ userInfo });
    }),
};
