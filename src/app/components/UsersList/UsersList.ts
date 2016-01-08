import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { UsersListItem } from '../../components/UsersListItem/UsersListItem';

@Component({
  selector: 'users-list',
  directives: [ UsersListItem ],
  template: require('./UsersList.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersList {
  @Input() users;
  @Input() loading;
  @Input() adding;
  @Output() addUser = new EventEmitter(false);
  @Output() deleteUser = new EventEmitter(false);
  @Output() reloadUsers = new EventEmitter(false);
}
