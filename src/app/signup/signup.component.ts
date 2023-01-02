import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });


  }

  ngOnInit() {

  }


  signUp() {
    const val = this.form.value;

    if (val.email && val.password && val.password === val.confirm) {
      this.errors = [];

      this.authService.signUp(val.email, val.password)
        .subscribe(
          (user) => console.log('User created successfully : ', JSON.stringify(user)),
          response => this.errors = response.error.errors
        );

    }

  }

}



