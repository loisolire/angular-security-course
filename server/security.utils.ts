const util = require('util');
const crypto = require('crypto');

import * as jwt from 'jsonwebtoken';

import * as fs from 'fs';


export const randomBytes = util.promisify(crypto.randomBytes);
const createJwt = util.promisify(jwt.sign);


const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

const SESSION_DURATION = 240;


export const createJsonWebToken = async (userId: string) => {
  return createJwt({}, RSA_PRIVATE_KEY, {algorithm: 'RS256', expiresIn: SESSION_DURATION, subject: userId});
};

export async function getUserIdFromToken(token: string){
  return jwt.verify(token, RSA_PUBLIC_KEY);
}
