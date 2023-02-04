import CustomError from '#Utils/customError';
import jwt from 'jsonwebtoken';

const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new CustomError(401, `Unauthorized`));
            }
            resolve(decoded);
        });
    });

const createToken = (payload) =>
    new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) {
                    reject(
                        new CustomError(
                            500,
                            `Error creating token ${err.message}`
                        )
                    );
                }
                resolve(token);
            }
        );
    });
export { verifyToken, createToken };
