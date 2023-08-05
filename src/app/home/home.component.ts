import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];

  // Inject the HttpClient service
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    // Update the URL to use the Heroku API endpoint
    this.http.get<any[]>('https://sbpokemon-api-c790c9c2ccbd.herokuapp.com/api/pokemons').subscribe(
      (response) => {
        this.pokemons = response;
      },
      (error) => {
        console.error('Error fetching Pokémon list', error);
      }
    );
  }
}
