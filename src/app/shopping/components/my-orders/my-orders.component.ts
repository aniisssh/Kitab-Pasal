import { snapshotChanges } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(
   private authService: AuthService,
   private orderService: OrderService) {

    this.orders$ = authService.user$
      .pipe(
        switchMap(u => orderService.getOrdersByUser(u.uid))
      )
  }


  ngOnInit() {
  }

}
