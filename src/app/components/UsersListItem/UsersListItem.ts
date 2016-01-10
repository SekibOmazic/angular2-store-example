import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'users-list-item',
  directives: [ ROUTER_DIRECTIVES ],
  template: require('./UsersListItem.html'),
  styles: ['.deleting {text-decoration: line-through}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListItem {
  @Input() user;
  @Output() deleteUser = new EventEmitter(false);

}
