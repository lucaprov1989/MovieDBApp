import { Component, OnInit, Input  } from '@angular/core';
import { Movie } from '../movie';
import { MovieService }  from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

	 movie : Movie;
	 posterIMG : string;
	 productionList : string;
	 productionCountriesList : string;
	 genresList : string;
	 backdropIMG : string;
	 vote: string;
	 revenue: string;


	constructor(
		private movieService: MovieService) { 

	}

	ngOnInit(): void {
		this.get_movie(157336); //interstellar as first movie
	}

	get_movie(id): void {
		this.movieService.getMovie(id)
			.subscribe(movie => {
				this.movie = movie
				this.posterIMG = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
				this.productionList = this.movieService.nestedDataToString(movie.production_companies)
				this.productionCountriesList = this.movieService.nestedDataToString(movie.production_countries)
				this.genresList = this.movieService.nestedDataToString(movie.genres)
				document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
				this.vote = this.movieService.getVote(movie.vote_average)
				this.revenue = this.movieService.getRevenue(movie.revenue)
			})

	}

}
