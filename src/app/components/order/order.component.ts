import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/models/IMovie';
import { ISendOrder, ISendOrderRow } from 'src/app/models/ISendOrder';
import { CheckOutService } from 'src/app/services/check-out.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  moviesInOrder: IMovie[] = [];

  constructor(
    private checkOutService: CheckOutService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkOutService.moviesInBasket$.subscribe(
      (moviesFromBasket: IMovie[]) => {
        this.moviesInOrder = moviesFromBasket;
        console.log('dessa filmer ska köpas', this.moviesInOrder);
      }
    );
  }

  sendOrder() {
    const order: ISendOrder = {
      companyId: 2,
      createdBy: this.buyerForm.controls['email'].value,
      totalPrice: this.getTotalPrice(),
      paymentMethod: this.buyerForm.controls['payment'].value,
      orderRows: this.getOrderRows(),
      created: new Date().toISOString(),
    };
    this.orderService.sendOrder(order).subscribe((resp) => {
      this.router.navigate(['orderDone']);
      this.checkOutService.clearBasket();
      console.log('Nu vill vi säga, tack för köpet', resp);
    });
  }

  getOrderRows(): ISendOrderRow[] {
    let orders: ISendOrderRow[] = [];
    for (let index = 0; index < this.moviesInOrder.length; index++) {
      const movie = this.moviesInOrder[index];
      orders.push({
        productId: movie.id,
        amount: 1,
      });
    }

    return orders;
  }

  getTotalPrice(): number {
    let price = 0;
    for (let index = 0; index < this.moviesInOrder.length; index++) {
      const movie = this.moviesInOrder[index];
      price = price + movie.price;
    }
    return price;
  }

  buyerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    payment: new FormControl('swish'),
  });
}
