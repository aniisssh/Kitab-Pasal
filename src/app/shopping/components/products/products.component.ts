import { async } from '@angular/core/testing';
import { Product } from 'shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  //this category field help n highlighting the selected field
  selectedCategory: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    // to give an actual observable, we need to await this promise
    //but we cant make constructor async so we use OnInit interface
    this.cart$ = (await this.shoppingCartService.getCart());

    this.populateProducts();
  }

  private applyFilter() {
    this.filteredProducts = (this.selectedCategory) ?
      this.products.filter(p => p.category === this.selectedCategory) :
      this.products;
  }

  private populateProducts(){
    // productService.getAll().subscribe(products => {
    //   this.products = products;
    //   route.queryParamMap.subscribe(params => {
    //     this.category = params.get('category');

    //     this.filteredProducts = (this.category) ?
    //       this.products.filter(p => p.category == this.category) :
    //       this.products;
    //   });
    // });

    this.productService
      .getAll()
      .pipe(
        switchMap(product => {
          this.products = product;
          return this.route.queryParamMap;
        }))
      .subscribe(params => {
        this.selectedCategory = params.get('category');
        this.applyFilter();
      });
  }

}