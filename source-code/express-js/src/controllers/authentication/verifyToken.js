const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/jwt_secret.js');

const verifyToken = (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    try {
        jwt.verify(token, secretKey);
        return res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).send({ message: 'Unauthorized user' });
    }
};

module.exports = verifyToken;