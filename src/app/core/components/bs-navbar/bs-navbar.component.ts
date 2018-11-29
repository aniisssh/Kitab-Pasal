import { AngularFireObject } from 'angularfire2/database';
import { ShoppingCartComponent } from '../../../shopping/components/shopping-cart/shopping-cart.component';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  isCollapsed = true;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    //getCart returns promise of observables so we need to awaits this in order to get observables; 
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
    this.shoppingCartService.clearCart();
  }
}
