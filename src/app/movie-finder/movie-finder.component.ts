import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Movie } from '../movie';
import { MovieComponent } from '../movie/movie.component';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-finder',
  templateUrl: './movie-finder.component.html',
  styleUrls: [ './movie-finder.component.css' ]
})

export class MovieFinderComponent implements OnInit {
  @Input() appmovie_ref : MovieComponent;
  searchbox_value : string;

  movie_search : any;
  movies_found = [];

  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  // Push a search term into the observable stream.
  search(term : string): void {
    this.searchTerms.next(term);
  }
  // get movie using reference from movie component
  getMovie(id : number) : void {
    this.appmovie_ref.get_movie(id);
    this.searchbox_value = '';
  }

  ngOnInit() : void {
    this.movie_search = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.movieService.searchMovies(term)),
    );
    this.movie_search.subscribe(movies => this.movies_found = movies.results);
  }
}