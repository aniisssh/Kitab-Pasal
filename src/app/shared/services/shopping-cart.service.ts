import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create() {
    return this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime()
    });
  }

  //it returns promise so we use await and async
  //for updating the batch value of shopping cart we make it promise
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x:any) => new ShoppingCart(x.items))
      );
  }

  //It only takes product Object
  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }


  private getItem(cartId, product) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
  }



  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId(); //if you want asynchronous data to act as synchonous 
    // use await and set function as async. For more info: 23_ Project - Shopping Cart Module - Video 3 05:20 onwards listen
    let item$ = this.getItem(cartId, product);
    // console.log(product);
    item$.valueChanges().pipe(take(1)).subscribe((item: any) => {  //If you only want the subscribe callback to get called once, you'll need to use the rxjs take operator.
      if (item) {
        let quantity = item.quantity + change;
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({ title: product.title, price: product.price, imageUrl: product.imageUrl, quantity: quantity });
        }
      } else {
        item$.set({ title: product.title, price: product.price, imageUrl: product.imageUrl, quantity: 1 });
      }
    });


  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.$key);
  //   item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
  //     if (item) {
  //       let quantity = (item.quantity || 0) + change;
  //       if (quantity === 0) item$.remove();
  //       else item$.update({
  //         title: product.title,
  //         imageUrl: product.imageUrl,
  //         price: product.price,
  //         quantity: quantity
  //       });
  //     });
  // }

}

  //   private async getOrCreateCartId(): Promise<string> {
  //     let cartId = localStorage.getItem('cartId');
  //     if (cartId) return cartId;

  //     let result = await this.create();
  //     localStorage.setItem('cartId', result.key);
  //     return result.key;

  //   }
}
