import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/models/IMovie';
import { CheckOutService } from 'src/app/services/check-out.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movies: IMovie[] = [];

  constructor(
    private service: MovieService,
    private checkOutService: CheckOutService
  ) {}

  ngOnInit(): void {
    this.service.movies$.subscribe((moviesFromApi) => {
      this.movies = moviesFromApi;
      console.log('Hej, jag har fått emot en del filmer här', this.movies);
    });
    this.service.getMovies();
  }
  addToBasket(movie: IMovie) {
    this.checkOutService.addMovie(movie);
  }
}
