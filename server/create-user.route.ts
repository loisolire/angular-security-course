import {Request, Response} from 'express';
import {db} from './database';
import {USERS} from './database-data';
import * as argon2 from 'argon2';
import {validatePassword} from './password-validation';


export async function createUserRoute(req: Request, res: Response) {

  const credentials = req.body;

  const errors: string[] = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {
    const passwordDigest = await argon2.hash(credentials.password);

    const user = db.createUser(credentials.email, passwordDigest);

    console.log(USERS);

    res.status(200).json({id: user.id, email: user.email});
  }


}
