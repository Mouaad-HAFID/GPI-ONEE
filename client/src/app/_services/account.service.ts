import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private CurrentUserSource = new ReplaySubject<User>(1);
  CurrentUser$ = this.CurrentUserSource.asObservable();

  constructor(private http: HttpClient) {}
  login(model: any) {
    return this.http.post(environment.baseUrl + '/account/login', model).pipe(
      map((res: User) => {
        const user = res;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.CurrentUserSource.next(user);
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('user');
    this.CurrentUserSource.next(null);
  }
  setCurrentUser(user: User) {
    this.CurrentUserSource.next(user);
  }
}
