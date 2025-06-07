import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";


export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access no token' }); 
    }

    try {
        const decoded = verifyToken(token);
        const userId = decoded.id || decoded._id; 
        const user = await findUserById(userId); 
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized access no user' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized access errror' });
    }
};

