import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/models/IMovie';
import { CheckOutService } from 'src/app/services/check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  moviesInBasket: IMovie[] = [];

  constructor(private checkOut: CheckOutService) {}

  ngOnInit(): void {
    this.checkOut.moviesInBasket$.subscribe((moviesFromShop) => {
      this.moviesInBasket = moviesFromShop;
      console.log('Hej, dessa filmer har jag valt', this.moviesInBasket);
    });
  }
  getTotalPrice(): number {
    let price = 0;
    for (let index = 0; index < this.moviesInBasket.length; index++) {
      const movie = this.moviesInBasket[index];
      price = price + movie.price;
    }
    return price;
  }
  removeFromBasket(i: number) {
    console.log(i, this.moviesInBasket[i]);
    this.checkOut.removeMovieFromBasket(i);
  }
  basketIsEmpty(): boolean {
    if (this.moviesInBasket.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
