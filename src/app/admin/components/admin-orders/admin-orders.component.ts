import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(
    private orderService: OrderService,
    private router: Router) {
    this.orders$ = orderService.getOrders();
  }

  ngOnInit() {
  }

  delete(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.orderService.delete(id);
    this.router.navigate(['/admin/orders']);

  }
}
