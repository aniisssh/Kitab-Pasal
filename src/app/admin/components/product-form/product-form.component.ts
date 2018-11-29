import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    //using snapshot to read the id parameters
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService.get(this.id)
        .pipe(
          take(1) //takes 1 value and unsubscribe, do the work of OnDestroy
        )
        .subscribe(product => this.product = product);
  }

  //takes a product object.to save this product in firebase, 
  //we generate a service which encapsulates all the call in the firebase
  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }


  ngOnInit() {
  }

}
