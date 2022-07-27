import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/userprofile.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserprofilesService {
  constructor(public baseApi: BaseApiService) {}

  getUsers = (): Observable<UserProfile[]> =>
    this.baseApi.get<UserProfile[]>('Users');

  createUser = (user: UserProfile): Observable<UserProfile> =>
    this.baseApi.post<UserProfile>('Users', user);
}
