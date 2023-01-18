import {Request, Response} from 'express';
import {db} from './database';
import * as argon2 from 'argon2';
import {validatePassword} from './password-validation';
import {randomBytes} from './security-utils';
import {sessionStore} from './session-store';
import {DbUser} from './db-user';


export function createUser(req: Request, res: Response) {

  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
    createUserAndSession(credentials, res).catch(e => {
      res.status(500).json({error: e.message});
    });
  }
}

async function createUserAndSession(credentials, res: Response) {
  const passwordDigest = await argon2.hash(credentials.password);

  try {
    const user: DbUser = db.createUser(credentials.email, passwordDigest);
    const sessionId = (await randomBytes(32)).toString('hex');

    sessionStore.createSession(sessionId, {id: user.id, email: user.email});

    res.cookie('SESSIONID', sessionId, {httpOnly: true, secure: true});

    res.status(200).json({id: user.id, email: user.email});
  } catch (e) {
    throw e;
  }
}


