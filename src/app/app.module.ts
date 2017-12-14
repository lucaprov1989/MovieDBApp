import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MovieService } from './movie.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { MovieFinderComponent } from './movie-finder/movie-finder.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieFinderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ MovieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
