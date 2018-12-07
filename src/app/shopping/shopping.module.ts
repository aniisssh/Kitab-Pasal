import { FeedbackComponent } from './components/feedback/feedback.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductFilterComponent } from 'shared/components/product-filter/product-filter.component';

import { AuthGuard } from './../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ViewMyOrdersComponent } from './components/view-my-orders/view-my-orders.component';
import { FeedbackSuccessComponent } from './components/feedback-success/feedback-success.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my-orders/:id', component: ViewMyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'my-feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
      { path: 'feedback-success/:id', component: FeedbackSuccessComponent, canActivate: [AuthGuard] },
    ])
  ],

  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    ViewMyOrdersComponent,
    FeedbackComponent,
    FeedbackSuccessComponent
  ]
})
export class ShoppingModule {}