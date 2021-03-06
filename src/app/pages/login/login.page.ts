import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (resp) => {
        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
        console.log(resp, 'in login page');
      },

      async (resp) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'login failed',
          message: resp.error.error,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  getEmail() {
    return this.credentials.get('email');
  }

  getPassword() {
    return this.credentials.get('password');
  }
}
