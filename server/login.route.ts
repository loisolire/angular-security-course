import {Request, Response} from 'express';
import * as crypto from 'crypto';
import {db} from './database';
import {DbUser} from './db-user';
import * as argon2 from 'argon2';
import {randomBytes} from './security-utils';
import {sessionStore} from './session-store';

interface Credentials {
   email: string;
   password: string
}

export function login(req: Request, res: Response) {
   const credentials: Credentials = req.body;
   const user = db.findUserByEmail(credentials.email);

   if(!user){
      res.sendStatus(403);
   } else {
      loginAndBuildResponse(credentials, user, res);
   }
}

async function loginAndBuildResponse(credentials: Credentials, user: DbUser, res: Response){
   try {
      const sessionId = await attemptLogin(credentials, user);
      console.log('login successful !');
      res.cookie('SESSIONID', sessionId, {httpOnly: true, secure: true});
      res.status(200).json({id: user.id, email: user.email});
   } catch (error) {
      console.log('login failed');
      res.sendStatus(403);
   }
}

async function attemptLogin(credentials: Credentials, user: DbUser): Promise<string>{
   const passwordIsValid =  await argon2.verify(user.passwordDigest, credentials.password);

   if(!passwordIsValid){
      throw new Error('Password invalid !');
   }

   const sessionId = (await randomBytes(32)).toString('hex');
   sessionStore.createSession(sessionId, {id: user.id, email: user.email});
   return sessionId;
}
