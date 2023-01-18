var util = require('util');
var crypto = require('crypto');

export const randomBytes: (number) => Promise<Buffer> = util.promisify(crypto.randomBytes);
