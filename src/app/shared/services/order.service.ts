import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as Order;
            data.$key = c.payload.key;
            return data;
          });
        }));
  }

  get(orderId) {
    return this.db.object('/orders/' + orderId).valueChanges();
  }

  // getOrdersByUser(userId: string){
  //   return this.db.list('/orders', 
  //   ref => ref.orderByChild('userId').equalTo(userId));
  // }
  getOrdersByUser(userId: string) {
    return this.db.list('/orders',
      ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as Order;
            data.$key = c.payload.key;
            return data;
          });
        }));
  }

  delete(orderId) {
    return this.db.object('/orders/' + orderId).remove();
  }

}
