import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemons();
    console.log(this.filteredPokemons);
  }

  getPokemons(): void {
    const apiUrl = this.searchText
    ? `${environment.Base_Url}/pokemons?search=${encodeURIComponent(this.searchText)}`
    : `${environment.Base_Url}/pokemons`;

    this.http.get<any[]>(apiUrl).subscribe(
      (response) => {
        this.pokemons = response;
        this.sortPokemonsAlphabetically();
        this.filterPokemons();
      },
      (error) => {
        console.error('Error fetching Pokemon list', error);
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
  }
}
