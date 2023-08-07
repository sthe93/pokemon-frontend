import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

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
    const apiUrl = `${environment.Base_Url}/pokemon/${pokemonId}`; // Use the base URL without the "pokemon" segment
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.pokemon = response;
        this.formatHeightAndWeight(); // Format height and weight after fetching details
      },
      (error) => {
        console.error('Error fetching Pokémon details', error);
      }
    );
  }
  
goBack(): void {
  this.router.navigate(['/']);
}

private formatHeightAndWeight(): void {
  if (this.pokemon.height) {
    this.pokemon.height = (this.pokemon.height / 10).toFixed(1);
  }
  if (this.pokemon.weight) {
    this.pokemon.weight = (this.pokemon.weight / 10).toFixed(1);
  }
}
}