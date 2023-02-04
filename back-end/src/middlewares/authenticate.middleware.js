import { verifyToken } from '#Services/token.service';
import asyncErrorHandler from '#Utils/asyncErrorHandler';

export default asyncErrorHandler(async (req, res, next) => {
    try {
        const bearerHeader = req.headers.authorization;
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const authData = await verifyToken(bearerToken);
            req.token = bearerToken;
            req.id = authData.id;
            next();
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.status(401).send({
            message: 'Unauthorized',
        });
    }
});
