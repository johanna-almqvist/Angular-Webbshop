import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMovie } from '../models/IMovie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies = new Subject<IMovie[]>();
  movies$ = this.movies.asObservable();

  constructor(private http: HttpClient) {}

  getMovies() {
    this.http
      .get<IMovie[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data: IMovie[]) => {
        this.movies.next(
          data.filter((value: IMovie) => {
            return value.imageUrl != null;
          })
        );
      });
  }
}
