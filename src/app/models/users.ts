import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import { Action, Reducer, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { normalize, arrayOf, Schema } from 'normalizr';
import { List, Map, Record, fromJS } from 'immutable';

import {
  LOADING_USERS,
  LOADED_USERS,
  LOADING_USER,
  LOADED_USER,
  ADDING_USER,
  ADDED_USER,
  DELETING_USER,
  DELETED_USER,
  PATCHED_USER
} from '../reducers/users';

const PATCH_USER = 'PATCH_USER';
const DELETE_USER = 'DELETE_USER';
const ADD_USER = 'ADD_USER';
const LOAD_USER = 'LOAD_USER';
const LOAD_USERS = 'LOAD_USERS';

export const userSchema = new Schema('users');
export const UserRecord = Record({
  id: null,
  name: null,
  email: null,
  deleting: false
});

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUsers extends Map<String, any> {
  result: List<Number>;
  entities: {users: Map<Number, IUser>};
  adding: boolean;
  loading: boolean;
}

@Injectable()
export class Users {
  loading$: Observable<Map<String, Boolean>>;
  adding$: Observable<Map<String, Boolean>>;
  users$: Observable<Map<String, any>>;

  private actions$ = new BehaviorSubject<Action>({type: null, payload: null});
  private _url: string = 'http://localhost:3100/users';

  constructor(private _store: Store<any>, private _http: Http) {
    const store$ = this._store.select<IUsers>('users');
    const headers = new Headers({'Content-Type': 'application/json'});

	  this.loading$ = store$.map(data => data.get('loading'));
	  this.adding$ = store$.map(data => data.get('adding'));
	  this.users$ = store$.map(data => {
	    return data.get('result').reduce((acc, userId) => {
	      acc.push(data.getIn(['entities', 'users', userId]));

	      return acc;
	    }, []);
	  });

	  let adds = this.actions$.filter(action => action.type === ADD_USER)
	    .do(() => this._store.dispatch({type: ADDING_USER}))
	    .mergeMap(action =>
        this._http.post(this._url, JSON.stringify(action.payload), {headers}),
        (action, res: Response) => ({type: ADDED_USER, payload: res.json()})
      );

    let loads = this.actions$.filter(action => action.type === LOAD_USERS)
	    .do(() => this._store.dispatch({type: LOADING_USERS}))
      .mergeMap(
        action => this._http.get(this._url),
        (action, res: Response) => ({type: LOADED_USERS, payload: res.json()})
      );

    let loadsOne = this.actions$.filter(action => action.type === LOAD_USER)
      .do(() => this._store.dispatch({type: LOADING_USER}))
      .mergeMap(
        action => this._http.get(`${this._url}/${action.payload}`),
        (action, res: Response) => ({type: LOADED_USER, payload: res.json()})
      );

    let patchesOne = this.actions$.filter(action => action.type === PATCH_USER)
      .mergeMap(
        action => this._http.patch(
          `${this._url}/${action.payload.id}`,
          JSON.stringify(action.payload),
          {headers}
        ),
        (action, res: Response) => ({type: PATCHED_USER, payload: res.json()})
      );

    let deletes = this.actions$.filter(action => action.type === DELETE_USER)
      .filter(action => ! action.payload.deleting)
      .do(action => this._store.dispatch({type: DELETING_USER, payload: action.payload}))
      .mergeMap(
        action => this._http.delete(`${this._url}/${action.payload.id}`),
        (action, res: Response) => ({type: DELETED_USER, payload: action.payload.id})
      );

    Observable
	    .merge(adds, loads, loadsOne, deletes, patchesOne)
	    .subscribe((action: Action) => this._store.dispatch(action));
  }

  addUser(user) {
    this.actions$.next({type: ADD_USER, payload: user});
  }

  deleteUser(user) {
    this.actions$.next({type: DELETE_USER, payload: user});
  }

  loadUsers() {
    this.actions$.next({type: LOAD_USERS});
  }

  loadUser(id) {
    id = parseInt(id, 10);
    this.actions$.next({type: LOAD_USER, payload: id});
    return this.users$
      .map(data => data.find(item => item.id === id));
  }

  patchUser(user) {
    this.actions$.next({type: PATCH_USER, payload: user});
  }

  reloadUsers() {
    this._store.dispatch({type: LOADED_USERS, payload: []});
    this.loadUsers();
  }
}
