import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IMovie } from '../models/IMovie';
import { MovieService } from './movie.service';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  private moviesInBasket: IMovie[] = JSON.parse(
    localStorage.getItem('moviesInBasket') || '[]'
  );
  moviesInBasket$: Observable<IMovie[]> = of(this.moviesInBasket);

  constructor(private movieService: MovieService) {}

  addMovie(movie: IMovie) {
    if (this.moviesInBasket.some((a: IMovie) => a.id === movie.id)) {
      console.warn('Filmen finns redan i varukorgen');
      return;
    }
    console.log(`Nu har vi lagt till filmen ${movie.name} i varukorgen`);
    this.moviesInBasket.push(movie);

    console.log(
      `Varukorgen innehåller just nu ${this.moviesInBasket.length} filmer`
    );
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('moviesInBasket', JSON.stringify(this.moviesInBasket));
  }
  clearBasket() {
    this.moviesInBasket.splice(0, this.moviesInBasket.length);
    this.saveToLocalStorage();
  }

  removeMovieFromBasket(i: number) {
    this.moviesInBasket.splice(i, 1);
    this.saveToLocalStorage();
  }
}
