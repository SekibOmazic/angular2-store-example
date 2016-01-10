//our root app component
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { UsersRoute } from './routes/UsersRoute/UsersRoute';

@Component({
  selector: 'app',
  template: require('./app.html'),
  directives: [ ROUTER_DIRECTIVES ]
})
@RouteConfig([
  {
     path: '/',
     redirectTo: ['/Users', 'UsersList']
  },
  {
    path: '/users/...',
    component: UsersRoute,
    as: 'Users'
  }
])
export class App {

}
