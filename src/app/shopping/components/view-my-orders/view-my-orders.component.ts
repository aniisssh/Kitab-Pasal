import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-my-orders',
  templateUrl: './view-my-orders.component.html',
  styleUrls: ['./view-my-orders.component.css']
})
export class ViewMyOrdersComponent implements OnInit {

  orders$;
  id;
  order:any = {};
  
  constructor(private orderService: OrderService,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.orderService.get(this.id)
        .pipe(
          take(1) //takes 1 value and unsubscribe, do the work of OnDestroy
        )
        .subscribe(p => this.order = p);
   }


  ngOnInit() {
  }

}
