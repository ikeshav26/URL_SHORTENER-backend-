import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access ' }); // fixed typo: staus -> status
    }

    try {
        const decoded = verifyToken(token);
        const userId = decoded.id || decoded._id; // support both id and _id
        const user = await findUserById(userId); // await the DB call
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access ' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};

