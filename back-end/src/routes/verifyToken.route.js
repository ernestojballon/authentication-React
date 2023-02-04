import authenticateMiddleware from '#Middlewares/authenticate.middleware';

export default {
    path: '/api/verifytoken',
    method: 'post',
    middleware: [authenticateMiddleware],
    handler: (req, res) => {
        res.status(200).send({ valid: true });
    },
};
