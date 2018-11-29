import { Product } from 'shared/models/product';
import { snapshotChanges } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  //products$ is chnaged from observable to array to make search possible in client side
  //since less items is available, we perform searching in client side instead of server side to make fast User Experience

  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService, private router: Router) {
    this.subscription = this.productService.getAll()
      .subscribe(
        products => this.filteredProducts = this.products = products);
    //related to getAll in productService which list all the value of products

  }




  // to search product from the list 
  filter(query: string) {
  

    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  delete(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(id);
    this.router.navigate(['/admin/products']);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
