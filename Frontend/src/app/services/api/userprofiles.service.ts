import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserprofilesService {
  constructor(public baseApi: BaseApiService) {}
  fetchedUsers = false;
  users: BehaviorSubject<UserProfile[]> = new BehaviorSubject<UserProfile[]>(
    []
  );

  getUsers = (): BehaviorSubject<UserProfile[]> => {
    if (!this.fetchedUsers) {
      this.baseApi
        .get<UserProfile[]>('Users')
        .subscribe((res) => this.users.next(res));
      this.fetchedUsers = true;
    }

    return this.users;
  };

  createUser = (user: UserProfile): Observable<UserProfile> =>
    this.baseApi.post<UserProfile>('Users', user).pipe(
      withLatestFrom(this.users),
      map(([user, users]) => {
        this.users.next([...users, user]);
        return user;
      })
    );
}
