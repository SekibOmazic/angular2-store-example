//our root app component
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';
import {UserComponent} from './user';

@Component({
  selector: 'users',
  template: require('./users.html'),
  directives: [UserComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  @Input() users;
  @Input() loading;
  @Input() adding;
  @Output() addUser = new EventEmitter(false);
  @Output() deleteUser = new EventEmitter(false);
  @Output() reloadUsers = new EventEmitter(false);

  ngOnInit() {
    console.log('Users Component Created!');
  }

  ngOnDestroy() {
    console.log('Users Component Destroyed!');
  }
}
