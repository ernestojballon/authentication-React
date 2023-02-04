import CustomError from '#Utils/customError';
import { ObjectID } from 'mongodb';
import { initializeDbConnection, getDbConnection } from '../datasource/db';

const startDbServer = async () => initializeDbConnection();

const getDatabase = () => getDbConnection('react-auth-db');

const queryUserByEmail = async (email) => {
    const db = getDatabase();
    const user = await db.collection('users').findOne({ email });
    if (user === null) {
        throw new CustomError(401, 'User not found');
    }
    return user;
};
const checkIfUserExists = async (email) => {
    const db = getDatabase();
    const user = await db.collection('users').findOne({ email });
    if (user === null) {
        return false;
    }
    return true;
};
const insertOneUser = async (user) => {
    const db = getDatabase();
    const result = await db.collection('users').insertOne(user);
    return result;
};
const getUserById = async (id) => {
    const db = getDatabase();
    const result = await db.collection('users').findOne({ _id: ObjectID(id) });
    return result;
};
const getAndUpdateUserById = async ({ id, userInfo }) => {
    const db = getDatabase();
    const result = await db
        .collection('users')
        .findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: { info: userInfo } },
            { returnOriginal: false }
        );
    return result.value.info;
};
// query user by id
const queryUserById = async (id) => {
    const db = getDatabase();
    const user = await db.collection('users').findOne({ _id: ObjectID(id) });
    if (user === null) {
        throw new CustomError(401, 'User not found');
    }
    return user;
};

export {
    startDbServer,
    queryUserByEmail,
    insertOneUser,
    checkIfUserExists,
    getUserById,
    getAndUpdateUserById,
    queryUserById,
};
