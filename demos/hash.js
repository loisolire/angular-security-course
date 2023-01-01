const crypto = require('crypto');

const password = 'monkey';

const aliceSalt = 1;
const bobSalt = 2;

// we will use another hash other SHA-256 during the course, this is just for demo purposes
const hash = crypto.createHash('sha256').update(password + bobSalt).digest('hex');

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");

// You should see in the console 000c285457fc971f862a79b786476c78812c8897063c6fa9c045f579a3b2d63f
