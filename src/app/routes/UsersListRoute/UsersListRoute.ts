import { Component } from 'angular2/core';

import { UsersListContainer } from '../../containers/UsersListContainer/UsersListContainer';

@Component({
  selector: 'UsersListRoute',
  template: require('./UsersListRoute.html'),
  directives: [ UsersListContainer ]
})
export class UsersListRoute {
  constructor() {

  }
}
