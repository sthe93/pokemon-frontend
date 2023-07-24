import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.http.get<any[]>('http://localhost:3000/api/pokemons').subscribe(
      (response) => {
        this.pokemons = response;
      },
      (error) => {
        console.error('Error fetching Pokémon list', error);
      }
    );
  }
}
