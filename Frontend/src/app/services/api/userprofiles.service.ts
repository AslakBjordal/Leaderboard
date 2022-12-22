import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, withLatestFrom } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserprofilesService {
  private fetchedUsers = false;
  private users = new BehaviorSubject<UserProfile[]>([]);

  private currentUser = new BehaviorSubject<UserProfile | undefined>(undefined);

  constructor(public baseApi: BaseApiService) {}

  setCurrentUser = (user: UserProfile) => this.currentUser.next(user);
  getCurrentUser = () => this.currentUser;

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

  UpdateUserElo = (userId:UserProfile["id"],newscore:number) => {
    this.baseApi.put<UserProfile>('Users',userId,newscore);
  }
}
