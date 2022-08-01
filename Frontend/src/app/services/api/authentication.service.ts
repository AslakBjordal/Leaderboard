import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private baseApi: BaseApiService) {}

  isLoggedIn = (): Observable<UserProfile | undefined> =>
    this.baseApi.get<UserProfile | undefined>('Authentication/IsLoggedIn');

  logIn = (user: UserProfile) =>
    this.baseApi.post<UserProfile>('Authentication/Login', user);
}
