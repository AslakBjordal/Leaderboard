import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private baseApi = environment.baseApi;

  constructor(private httpClient: HttpClient) {}

  get = <T>(url: string, parameters = {}): Observable<T> =>
    this.request('get', url, parameters);

  post = <T>(url: string, body = {}): Observable<T> =>
    this.request('post', url, {}, body);

  put = <T>(url: string, parameters = {}, body = {}): Observable<T> =>
    this.request('put', url, parameters, body);

  delete = <T>(url: string): Observable<T> => this.request('delete', url);

  request<T>(
    method: string,
    url: string,
    parameters = {},
    body = {}
  ): Observable<T> {
    const httpOptions = {
      body,
      params: new HttpParams({ fromObject: parameters }),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    };

    return this.httpClient
      .request<T>(method, environment.baseApi + url, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw new Error(
            error.status
              ? 'An unexpected error occured'
              : 'Could not connect to server'
          );
        })
      );
  }
}
