import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

@Component({
  selector: 'user',
  template: require('./user.html'),
  styles: ['.deleting {text-decoration: line-through}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user;
  @Output() deleteUser = new EventEmitter(false);

  ngOnInit() {
    console.log(this.user.name, 'Created!');
  }

  ngOnDestroy() {
    console.log(this.user.name, 'Destroyed!');
  }
}
