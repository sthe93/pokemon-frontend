import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule,FormsModule,RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemons on component initialization', () => {
    spyOn(component, 'getPokemons');
    component.ngOnInit();
    expect(component.getPokemons).toHaveBeenCalled();
  });

  it('should fetch and display Pokemon list', () => {
    const mockHttpClient = TestBed.inject(HttpClient);
    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Charmander' }];

    spyOn(mockHttpClient, 'get').and.returnValue(of(mockPokemons));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.pokemons).toEqual(mockPokemons);
    expect(component.filteredPokemons).toEqual(mockPokemons);
  });

  it('should sort Pokemon list alphabetically', () => {
    const mockPokemons = [
      { name: 'Charmander' },
      { name: 'Squirtle' },
      { name: 'Bulbasaur' }
    ];

    component.pokemons = mockPokemons;
    component.sortPokemonsAlphabetically();

    expect(component.pokemons).toEqual([
      { name: 'Bulbasaur' },
      { name: 'Charmander' },
      { name: 'Squirtle' }
    ]);
  });

  it('should filter Pokemon list based on searchText', () => {
    const mockPokemons = [
      { name: 'Pikachu' },
      { name: 'Charmander' },
      { name: 'Squirtle' }
    ];

    component.pokemons = mockPokemons;
    component.searchText = 'cha';
    component.filterPokemons();

    expect(component.filteredPokemons).toEqual([
      { name: 'Charmander' }
    ]);
  });
});
