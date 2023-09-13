import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  /* LoginService, */ LoginServiceMock,
} from 'src/app/services/login.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('snackBarState', [
      state(
        'visible',
        style({
          transform: 'translateY(0%)',
          opacity: 1,
        })
      ),
      transition('* => visible', [
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
        animate('500ms ease-in'),
      ]),
      transition('visible => *', [
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(100%)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  logginIn = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceMock,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginService.logginIn.subscribe(
      (logginIn) => (this.logginIn = logginIn)
    );
  }

  async onSubmit() {
    const formValues = this.loginForm.value;

    try {
      const result = await this.loginService.login(formValues);
      if (result) {
        this.router.navigate(['']);
        this.snackBar.open('Login feito com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: 'success-toast',
        });
      } else {
        this.snackBar.open('Seu email ou senha estão incorretos', 'Fechar', {
          duration: 3000,
          panelClass: 'error-toast',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
