import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Action, Reducer, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import {normalize, arrayOf, Schema} from 'normalizr';
import {List, Map, Record, fromJS} from 'immutable';

const LOAD_USERS = 'LOAD_USERS';
const LOADING_USERS = 'LOADING_USERS';
const LOADED_USERS = 'LOADED_USERS';
const ADD_USER = 'ADD_USER';
const ADDING_USER = 'ADDING_USER';
const ADDED_USER = 'ADDED_USER';
const DELETE_USER = 'DELETE_USER';
const DELETING_USER = 'DELETING_USER';
const DELETED_USER = 'DELETED_USER';

const userSchema = new Schema('users');
const UserRecord = Record({
  id: null,
  name: null,
  email: null,
  deleting: false
});

interface IUser {
  id: string;
  name: string;
  email: string;
  deleting: boolean;
}

interface IUsers extends Map<String, any> {
  result: List<Number>;
  entities: {users: Map<Number, IUser>};
  adding: boolean;
  loading: boolean;
}

@Injectable()
export class Users {
  static initialState: IUsers = fromJS({
    result: [],
    entities: {
      users: {}
    },
    adding: false,
    loading: false
  });

  static updateState: Reducer<any> = (state = Users.initialState, action: Action) => {
    switch (action.type) {
      case LOADING_USERS:
        return state.set('loading', true);
      case LOADED_USERS:
        const normalizedUsers: IUsers = normalize(action.payload, arrayOf(userSchema));

        return state.withMutations(map => {
          map.set('loading', false);
          map.set('result', List(normalizedUsers.result));
          normalizedUsers.result.forEach((userId: number) => {
            map.setIn(
              ['entities', 'users', userId],
              new UserRecord(normalizedUsers.entities.users[userId])
            );
          });
        });
      case DELETING_USER:
        return state.setIn(['entities', 'users', action.payload.id, 'deleting'], true);
      case DELETED_USER:
        return state.withMutations(map => map
          .deleteIn(['entities', 'users', action.payload.id])
          .deleteIn(['result', map.get('result').indexOf(action.payload.id)])
        );
      case ADDING_USER:
        return state.set('adding', true);
      case ADDED_USER:
        return state.withMutations(map => map
          .setIn(['entities', 'users', action.payload.id], new UserRecord(action.payload))
          .update('result', list => list.push(action.payload.id))
          .set('adding', false)
        );
      default:
        return state;
    }
  };

  loading$: Observable<Map<String, Boolean>>;
  adding$: Observable<Map<String, Boolean>>;
  users$: Observable<Map<String, any>>;

  private actions$ = new BehaviorSubject<Action>({type: null, payload: null});
  private _url: string = 'http://angular2-ngrx-store.getsandbox.com/users';

  constructor(private _store: Store<any>, private _http: Http) {
	  const store$ = this._store.select<IUsers>('Users');

	  this.loading$ = store$.map(data => data.get('loading'));
	  this.adding$ = store$.map(data => data.get('adding'));
	  this.users$ = store$.map(data => {
	    return data.get('result').reduce((acc, userId) => {
	      acc.push(data.getIn(['entities', 'users', userId]));

	      return acc;
	    }, []);
	  });

	  this.actions$.filter(action => action.type === ADD_USER)
	    .do(() => this._store.dispatch({type: ADDING_USER}))
	    .mergeMap(action => this._http.post(this._url, JSON.stringify(action.payload)))
      .map((res: Response) => res.json())
	    .subscribe(data => this._store.dispatch({type: ADDED_USER, payload: data}));

    this.actions$.filter(action => action.type === LOAD_USERS)
	    .do(() => this._store.dispatch({type: LOADING_USERS}))
      .mergeMap(action => this._http.get(this._url))
      .map((res: Response) => res.json())
	    .subscribe(data => this._store.dispatch({type: LOADED_USERS, payload: data}));

	  this.actions$.filter(action => action.type === DELETE_USER && ! action.payload.deleting)
	    .do(action => this._store.dispatch({type: DELETING_USER, payload: action.payload}))
      .mergeMap(action => this._http.delete(`${this._url}/${action.payload.id}`))
      .map((res: Response) => res.json())
	    .subscribe(data => this._store.dispatch({type: DELETED_USER, payload: data}));

    this.loadUsers();
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

  reloadUsers() {
    this._store.dispatch({type: LOADED_USERS, payload: []});
    this.loadUsers();
  }
}
