import { DataTableModule } from 'angular-6-datatable';
import { SharedModule } from 'shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AdminFeedbacksComponent } from './components/admin-feedbacks/admin-feedbacks.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild ([
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders/:id',
        component: ViewOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/feedbacks',
        component: AdminFeedbacksComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ]),

  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ViewOrdersComponent,
    AdminFeedbacksComponent,
  ]
})
export class AdminModule { }
