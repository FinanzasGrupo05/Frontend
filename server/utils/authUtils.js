const crypto = require('crypto');

// Define a secure secret key (store it in an environment variable in production)
const SECRET_KEY = '5xihkW2ZgPAF4T43gD6IWD6j1oMuxzpT';

// Encrypt the token using HMAC and a secret key
const encryptToken = (payload) => {
    const payloadString = JSON.stringify(payload);
    const hmac = crypto.createHmac('sha256', SECRET_KEY); // Use HMAC with SHA-256
    hmac.update(payloadString);
    const hash = hmac.digest('hex');
    return Buffer.from(`${payloadString}.${hash}`).toString('base64');
};

// Decrypt and validate the token
const decryptToken = (token) => {
    const tokenString = Buffer.from(token, 'base64').toString('utf-8');
    const [payloadString, hash] = tokenString.split('.');

    // Recompute the HMAC hash to validate the token
    const hmac = crypto.createHmac('sha256', SECRET_KEY);
    hmac.update(payloadString);
    const expectedHash = hmac.digest('hex');

    if (hash !== expectedHash) {
        throw new Error('Invalid token');
    }

    return JSON.parse(payloadString);
};

// Validate token: checks if it has expired
const validateToken = (token) => {
    if(!token) return false;
    try {
        const data = decryptToken(token);
        return data.expires > Date.now();
    } catch (err) {
        return false;
    }
};
const getUserId = (token) => {
    if(!token) return false;
    try {
        const data = decryptToken(token);
        return data.id;
    } catch (err) {
        return false;
    }
};

// Renew token: creates a new token with a fresh expiration
const renewToken = (userId, validHours) => {
    const payload = {
        id: userId,
        expires: Date.now() + validHours * 60 * 60 * 1000
    };
    return encryptToken(payload);
};

module.exports = { validateToken, renewToken };