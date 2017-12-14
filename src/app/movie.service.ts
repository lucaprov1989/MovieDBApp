import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as numeral from 'numeral';

const httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

@Injectable()
export class MovieService {

	private movieUrl = 'https://api.themoviedb.org/3/movie/';
	private movieUrlSearch = 'http://api.themoviedb.org/3/search/movie?api_key=cfe422613b250f702980a3bbf9e90716&query=';
	private apiKey = '?&api_key=cfe422613b250f702980a3bbf9e90716';

	constructor(
		private http: HttpClient
	) { }


	/* GET Movie by id. Will 404 if id not found */
	getMovie(id: number): Observable<Movie> {
		const url = `${this.movieUrl}${id}${this.apiKey}`;
		return this.http.get<Movie>(url).pipe(
			catchError(this.handleError<Movie>(`getMovie id=${id}`))
		);
	}
	/* Array to string */
	nestedDataToString(nestedData) : string {
		let nestedArray = [],

		resultString;
		nestedData.forEach(function(item, i){
			nestedArray.push(item.name);
		});
		resultString = nestedArray.join(', '); // array to string
		return resultString;
	};

	/* Format vote */
	getVote(vote : any) : string {
		if (vote == 'undefined' || vote == 0) {
	          vote = '-'
	        } else {
	          vote = vote + ' / 10'
	        };
        return vote;
	};

	/* Format revenue */
	getRevenue(revenue : any) : string {
		let out_revenue;

		if (revenue === 'undefined' || revenue === 0) {
			out_revenue = '-';
		} else {
			out_revenue = numeral(revenue).format('($0,0)');
		};

		return out_revenue;
	};


	/* GET Movies whose name contains search term */
	searchMovies(term: string): Observable<Movie[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Movie[]>(`${this.movieUrlSearch}${term}`).pipe(
			catchError(this.handleError<Movie[]>('searchMovies', []))
		);
	}

	/**
	* Handle Http operation that failed.
	* Let the app continue.
	* @param operation - name of the operation that failed
	* @param result - optional value to return as the observable result
	*/
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

		console.error(error); // log to console

		// Let the app keep running by returning an empty result.
		return of(result as T);
		};
	}
}
