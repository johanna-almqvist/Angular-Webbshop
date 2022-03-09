import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) {}

  getOrders() {
    const url =
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=2';

    this.http.get<IOrder[]>(url).subscribe((data: IOrder[]) => {
      this.orders.next(data);
    });
  }
  deleteOrder(id: number) {
    const url = `https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${id}`;

    this.http.delete<IOrder>(url).subscribe((data: IOrder) => {
      this.getOrders();
    });
  }
}
