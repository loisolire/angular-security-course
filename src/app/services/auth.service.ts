import {filter, map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../model/user';

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ''
};


@Injectable()
export class AuthService {

  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {
    this.http.post<User>('/api/user', {})
      .subscribe(user => {
        console.log('get user ', user ? user : ANONYMOUS_USER);
        this.subject.next(user ? user : ANONYMOUS_USER);
      });
  }

  signUp(email: string, password: string) {
    return this.http.post<User>('/api/signup', {email, password}).pipe(
      tap(user => {
        this.subject.next(user);
      }));
  }

  logout() {
    return this.http.post('/api/logout', {message: 'Logout !'});
  }

}
