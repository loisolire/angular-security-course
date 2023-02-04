import {NextFunction, Request, Response} from 'express';
import {getUserIdFromToken} from './security.utils';

export function retrieveUserIdFromRequest(req: Request, res: Response, next: NextFunction) {
  const jwt = req.cookies['SESSIONID'];
  if (jwt) {
    handleRetrieveUserIdFromRequest(jwt, req)
      .then(() => next())
      .catch((e) => {
        console.log(e);
        next();
      });
  } else {
    next();
  }
}

async function handleRetrieveUserIdFromRequest(jwt: string, req: Request) {
  try {
    const payload = await getUserIdFromToken(jwt);
    console.log(payload);
    req['userId'] = payload.sub;
  } catch (err) {
    console.log('Could not extract userId !', err.message);
  }
}
