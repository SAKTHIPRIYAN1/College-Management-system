import express from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'my_secret_key';

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized.' });
            }
            req.user = decodedToken; // Attach the decoded token to the request object
            next(); // Call the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: 'Token required' });
    }
};


const SECRET_KEY_Al= 'my_secret_key_al';
const authAl= (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // console.log(SECRET_KEY_Al);
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY_Al, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized.' });
            }
            req.user = decodedToken; // Attach the decoded token to the request object
            next(); // Call the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: 'Token required' });
    }
};

export default { auth,authAl };

