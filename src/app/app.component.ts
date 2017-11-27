import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  nameControl: FormControl;
  fullnameControl: FormGroup;
  userListControl: FormGroup;
  trafficControl: FormControl;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nameControl = new FormControl('John', [myValidator(3)], [myAsycValidator]);
    this.nameControl.valueChanges.subscribe((value) => console.log(value));
    this.nameControl.statusChanges.subscribe((status) => {
      console.log(this.nameControl.errors);
      console.log(status);
    });

    this.fullnameControl = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
    });

    this.fullnameControl.valueChanges.subscribe((value) => console.log(value));

    // this.userListControl = new FormGroup({
    //   users: new FormArray([
    //     new FormControl('Alice'),
    //     new FormControl('Bob'),
    //     new FormControl('John')
    //   ])
    // });

    this.userListControl = this.formBuilder.group({
      users: this.formBuilder.array([['Alice'], ['Bob'], ['John'] ])
    });

    this.userListControl.valueChanges.subscribe((value) => console.log(value));

    this.trafficControl = new FormControl();

    this.trafficControl.valueChanges.subscribe((value) => console.log(value));

  }

  removeUserControl(index) {
    (this.userListControl.controls['users'] as FormArray).removeAt(index);
  }

  addUserControl() {
    (this.userListControl.controls['users'] as FormArray).push(new FormControl(''));
  }
}
function myValidator(number) {
  return function (formControl: FormControl) {
    if (formControl.value.length < number) {
      return { myValidator: { message: 'Should be something'} };
    }
    return null;
  };
}


function myAsycValidator(formControl: FormControl): Observable<null|any> {
  if (formControl.value.length < 3) {
    return Observable.of({ myAsycValidator: { message: 'Should be something'} });
  }
  return Observable.of(null);
}
