export class Movie {
    adult : boolean;
	backdrop_path : string;
	belongs_to_collection : boolean;
	budget : number;
	genres : Array<{ id: number, name: string}>; 
	homepage : string;
	id : number;
	imdb_id : string;
	original_language : string;
	original_title : string;
	overview : string;
	popularity : number;
	poster_path : string;
	production_companies : Array<{ id: number, name: string}>;
	production_countries : Array<{ iso_3166_1: number, name: string}>; 
	release_date : string;
	revenue : number;
	runtime : number;
	spoken_languages : Array<{ iso_639_1: number, name: string}>;
	status : string;
	tagline : string;
	title : string;
	video : boolean;
	vote_average : number;
	vote_count : number;
}

	
