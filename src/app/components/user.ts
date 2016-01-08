import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {IUser} from '../models/users';

@Component({
  selector: 'user',
  template: require('./user.html'),
  styles: ['.deleting {text-decoration: line-through} .hide{display:none;} a{cursor: pointer}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: IUser;
  @Output() deleteUser = new EventEmitter<IUser>();
  @Output() updateUser = new EventEmitter<IUser>();

  private editMode: boolean = false;
  private deleting: boolean = false;
  private updating: boolean = false;

  toggle(name, email): void {
    name.value = this.user.name;
    email.value = this.user.email;
    this.editMode = !this.editMode;
  }

  remove(): void {
    this.deleting = true;
    this.deleteUser.emit(this.user);
  }

  update(name, email): boolean {
    if (name.value.length > 0 && email.value.length > 0) {
      let newUser = {
        id: this.user.id,
        name: name.value,
        email: email.value,
        deleting: false,
        updating: false
      };

      this.updating = true;
      this.updateUser.emit(newUser);
      this.toggle(name, email);
    }

    return false;
  }

  ngOnInit() {
    console.log(this.user.name, 'Created!');
  }

  ngOnDestroy() {
    console.log(this.user.name, 'Destroyed!');
  }
}
