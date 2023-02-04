import bcrypt from 'bcrypt';

import CustomError from '#Utils/customError';

const compare = async (password, passwordHash) => {
    if (await bcrypt.compare(password, passwordHash)) {
        return true;
    }
    throw new CustomError(500, 'Password does not match');
};
const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
};
export { compare, hash };
