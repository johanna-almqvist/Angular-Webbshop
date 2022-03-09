import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMovie } from '../models/IMovie';
import { ISendOrder } from '../models/ISendOrder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private moviesInOrder: IMovie[] = [];
  moviesInOrder$: Observable<IMovie[]> = of(this.moviesInOrder);

  constructor(private httpClient: HttpClient) {}

  sendOrder(order: ISendOrder): Observable<ISendOrder> {
    console.log('sendOrder', order);
    return this.httpClient.post<ISendOrder>(
      'https://medieinstitutet-wie-products.azurewebsites.net/api/orders',
      order
    );
  }
}
