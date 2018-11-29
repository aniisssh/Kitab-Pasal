import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { KeyedRead } from '@angular/compiler';
import { DefaultRouteReuseStrategy } from '@angular/router/src/route_reuse_strategy';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  items;
  constructor(private db: AngularFireDatabase) { }

  // to push the product. 
  // it return promise so return keyword is used 
  // link with product-form.component.ts save() methods
  create(product) {
    return this.db.list('/products/').push(product);
  }

  //must always use this snapshotChanges method to map the key of firebase
  getAll(){
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as Product;
            data.$key= c.payload.key;
            return data;
          });
        }));
  }

  //method to retrieve product
  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }
  //updating the product
  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  //deleting the product
  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
