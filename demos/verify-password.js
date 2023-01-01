const crypto = require('crypto');

const storedHash = '000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f';

const password = "monkey";

// a unique salt per user should be included, more on this later
const hash = crypto.createHash('sha256').update(password).digest('hex');

const isPasswordValid = (hash === storedHash);

console.log("Password is valid: " + isPasswordValid);

