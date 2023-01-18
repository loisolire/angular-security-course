import {db} from './database';
import {sessionStore} from './session-store';
import {Response} from 'express';


export function readAllLessons(req, res: Response) {

  const sessionId = req.cookies['SESSIONID'];
  const isValidSession = sessionStore.isValidSession(sessionId);
  if (!isValidSession) {
    res.sendStatus(403);
  } else {
    res.status(200).json({lessons: db.readAllLessons()});
  }
}
