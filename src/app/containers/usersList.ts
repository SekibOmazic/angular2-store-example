//our root app component
import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {Users} from '../models/users';
import {UsersComponent} from '../components/users';

@Component({
  selector: 'users-list',
  providers: [Users],
  template: `
    <h3>Sample Users List App</h3>
    <users
        [users]="users.users$ | async"
        [loading]="users.loading$ | async"
        [adding]="users.adding$ | async"
        (addUser)="users.addUser($event)"
        (deleteUser)="users.deleteUser($event)"
        (reloadUsers)="users.reloadUsers()">
    </users>
  `,
  directives: [UsersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListContainer {
  constructor(public users: Users) {}
}
