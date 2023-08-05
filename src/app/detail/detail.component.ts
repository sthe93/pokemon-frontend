import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pokemonId = params.get('id');
      if (pokemonId) {
        this.getPokemonDetails(pokemonId);
      } else {
        console.error('Invalid Pokémon ID');
      }
    });
  }

  getPokemonDetails(pokemonId: string): void {
    // Update the URL to use the Heroku API endpoint
    this.http.get<any>(`https://sbpokemon-api-c790c9c2ccbd.herokuapp.com/api/pokemon/${pokemonId}`).subscribe(
      (response) => {
        this.pokemon = response;
      },
      (error) => {
        console.error('Error fetching Pokémon details', error);
      }
    );
  }
goBack(): void {
  this.router.navigate(['/']); // Replace '/' with the actual path of your home page if needed
}

private formatHeightAndWeight(): void {
  // Format height to display in meters
  if (this.pokemon.height) {
    this.pokemon.height = (this.pokemon.height / 10).toFixed(1);
  }

  // Format weight to display in kilograms
  if (this.pokemon.weight) {
    this.pokemon.weight = (this.pokemon.weight / 10).toFixed(1);
  }
}
}