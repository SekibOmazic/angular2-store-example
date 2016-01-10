import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { UsersDetailContainer } from '../../containers/UsersDetailContainer/UsersDetailContainer';

@Component({
  selector: 'UsersDetailRoute',
  directives: [ ROUTER_DIRECTIVES, UsersDetailContainer ],
  template: require('./UsersDetailRoute.html')
})
export class UsersDetailRoute {

}
