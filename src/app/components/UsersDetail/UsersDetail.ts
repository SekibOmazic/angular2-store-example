import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

@Component({
  selector: 'users-detail',
  template: require('./UsersDetail.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersDetail {
  @Input() user;
  @Input() loading;
  @Output() patchUser = new EventEmitter(false);

  userForm: ControlGroup;

  constructor(public builder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.builder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }
}
