//our root app component
import {Component} from 'angular2/core';
import {UsersListContainer} from './containers/usersList';

@Component({
  selector: 'app',
  template: require('./app.html'),
  directives: [UsersListContainer]
})
export class App {}
