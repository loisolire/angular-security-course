import {User} from '../src/app/model/user';
import {Moment} from 'moment/moment';
import moment = require('moment');

export class Session {
  static readonly VALIDITY_MINUTES = 2;

  sessionId: string;
  user: User;
  public validUntil: Moment;

  constructor(sessionId: string, user: User) {
    this.sessionId = sessionId;
    this.user = user;
    this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
  }

  isValid(): boolean {
    return moment().diff(this.validUntil, 'minutes') <= 0;
  }
}
