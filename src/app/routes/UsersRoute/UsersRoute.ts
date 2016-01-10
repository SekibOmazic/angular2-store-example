import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { UsersListRoute } from '../UsersListRoute/UsersListRoute';
import { UsersDetailRoute } from '../UsersDetailRoute/UsersDetailRoute';
import { Users } from '../../models/users';

@Component({
  selector: 'UsersRoute',
  template: require('./UsersRoute.html'),
  directives: [ ROUTER_DIRECTIVES ],
  providers: [Users]
})
@RouteConfig([
  {
    path: '/list',
    component: UsersListRoute,
    as: 'UsersList'
  },
  {
    path: '/detail/:id',
    component: UsersDetailRoute,
    as: 'UsersDetail'
  }
])
export class UsersRoute {

}
