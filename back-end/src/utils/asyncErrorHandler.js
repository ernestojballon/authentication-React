export default (cb) => async (req, res, next) => {
    try {
        await cb(req, res, next);
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode);
        } else {
            res.status(500);
        }
        console.log(err);
        res.json({ message: err.message, status: err.statusCode });
    }
};
