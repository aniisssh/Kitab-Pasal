import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { Component } from '@angular/core';
import { UrlResolver } from '@angular/compiler';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
   //this code will help us to route to the same page when reloaded of reloading to home page
    auth.user$.subscribe(user => {
      if (user) {
      userService.saveUser(user);
      let returnUrl = localStorage.getItem('returnUrl');
      router.navigateByUrl(returnUrl);
      }
    });
  }
}
