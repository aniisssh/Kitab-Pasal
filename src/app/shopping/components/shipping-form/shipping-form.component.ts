import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../../../shared/models/order';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor( 
    private auth: AuthService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  placeOrder(shipping) {
    let order = new Order(this.userId, shipping , this.cart);
    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
