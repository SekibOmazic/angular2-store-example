import { Injectable } from 'angular2/core';
import { Headers, Http, Request, RequestMethod, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../models/users';
import { API_USERS_URL } from './constants';


@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  createUser(body: any): Observable<IUser> {
    return this.request({
      body,
      method: RequestMethod.Post,
      url: API_USERS_URL
    });
  }

  deleteUser(userId: string): Observable<IUser> {
    return this.request({
      method: RequestMethod.Delete,
      url: `${API_USERS_URL}/${userId}`
    });
  }

  loadUsers(): Observable<IUser[]> {
    return this.request({
      method: RequestMethod.Get,
      url: API_USERS_URL
    });
  }

  loadUser(userId: string): Observable<IUser> {
    return this.request({
      method: RequestMethod.Get,
      url: `${API_USERS_URL}/${userId}`
    });
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.request({
      body: user,
      method: RequestMethod.Put,
      url: `${API_USERS_URL}/${user.id}`
    });
  }

  request(options: any): Observable<any> {
    if (options.body) {
      if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
      }

      options.headers = new Headers({
        'Content-Type': 'application/json'
      });
    }

    return this.http.request(new Request(options))
      .map((res: Response) => res.json());
  }
}
