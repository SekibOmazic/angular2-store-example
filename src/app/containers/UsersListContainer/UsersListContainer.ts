import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { Users } from '../../models/users';

import { UsersList } from '../../components/UsersList/UsersList';

@Component({
  selector: 'users-list-container',
  directives: [ UsersList ],
  template: require('./UsersListContainer.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListContainer {
  constructor(public users: Users) {
    users.loadUsers();
  }
}
