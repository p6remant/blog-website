import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        ...this.loginForm.value,
        expiresInMins: 30,
      };

      this.loginService.login(payload).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.loginService.setAccessToken(res.accessToken);
          this.loginService.setRefreshToken(res.refreshToken);
          this.loginService.setUsername(res.username);
          this.loginService.setUserId(res.id);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          console.log('error details:', err.error.message);
        },
      });
    }
  }
}
