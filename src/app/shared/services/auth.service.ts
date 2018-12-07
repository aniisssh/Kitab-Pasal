
import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  userDetails: firebase.User = null;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) {
    this.user$ = afAuth.authState;
  
  this.user$.subscribe(
    (user$) => {
      if (user$) {
        this.userDetails = user$;
      }
      else {
        this.userDetails = null;
      }
    }
  );
}

  signInWithTwitter() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    var provider = new firebase.auth.TwitterAuthProvider();

    this.afAuth.auth.signInWithPopup(provider);

  }

  signInWithFacebook() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    var provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('user_birthday');

    this.afAuth.auth.signInWithPopup(provider);

  }

  signInWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    this.afAuth.auth.signInWithPopup(provider);
  }


  login() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login'])
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap((user: firebase.User) => {
          if (user) return this.userService.get(user.uid);
          return of(null);
        })
      );
  }
}
