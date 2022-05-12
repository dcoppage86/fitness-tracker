import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuth = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuth = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(() => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(
          'This User is Already Signed Up, Try Again!',
          null,
          3000
        );
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);
      })
      .catch(() => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(
          'Invalid Username and/or Password!',
          null,
          3000
        );
      });
  }

  logout() {
    this.fireAuth.signOut();
  }

  getUser() {
    // return { ...this.user };
  }

  isAuthenticated() {
    return this.isAuth;
  }
}
