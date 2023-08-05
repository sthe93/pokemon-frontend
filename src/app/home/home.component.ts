import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
    console.log(this.filteredPokemons)
  }

  getPokemons(): void {
    const apiUrl = this.searchText
      ? `https://sbpokemon-api-c790c9c2ccbd.herokuapp.com/api/pokemons?search=${encodeURIComponent(this.searchText)}`
      : 'https://sbpokemon-api-c790c9c2ccbd.herokuapp.com/api/pokemons';

    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.pokemons = response;
        this.sortPokemonsAlphabetically(); // Call the sorting function after fetching the data
        this.filterPokemons(); // Call the filtering function after fetching the data
      },
      (error) => {
        console.error('Error fetching Pokémon list', error);
      }
    );
  }

  sortPokemonsAlphabetically(): void {
    this.pokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }}