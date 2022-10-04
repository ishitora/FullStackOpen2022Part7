const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method);
    logger.info('Path:  ', request.path);
    logger.info('Body:  ', request.body);
    logger.info('---');
    next();
};

const tokenExtractor = (request, response, next) => {
    // code that extracts the token
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
};
const userExtractor = async (request, response, next) => {
    // code that extracts the token
    if (!request.token) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const decodedToken = jwt.verify(request.token, 'password');
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    } else {
        request.user = await User.findById(decodedToken.id);
    }

    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token',
        });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired',
        });
    } else if (error.message) {
        return response.status(400).json({ error: error.message });
    } else {
        return response.status(400).json({ error: 'error' });
    }
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
    userExtractor,
};
