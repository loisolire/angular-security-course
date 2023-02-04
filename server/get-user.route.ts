
import {db} from './database';
import {Request, Response} from 'express';



export function getUser(req: Request, res: Response) {

    const user = db.findUserById(req['userId']);

    if (user) {
        res.status(200).json({id: user.id, email: user.email});
    } else {
        res.sendStatus(204);
    }
}
