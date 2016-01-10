import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Observable } from 'rxjs/Observable';
import { Users, IUser } from '../../models/users';
import { UsersDetail } from '../../components/UsersDetail/UsersDetail';

@Component({
  selector: 'users-detail-container',
  directives: [ UsersDetail ],
  template: require('./UsersDetailContainer.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetailContainer {
  user$: Observable<IUser>;

  constructor(public users: Users, public params: RouteParams) {}

  ngOnInit() {
    this.user$ = this.users.loadUser(parseInt(this.params.get('id'), 10));
  }
}
