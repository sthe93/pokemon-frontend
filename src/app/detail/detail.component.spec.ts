import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { DetailComponent } from './detail.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const mockActivatedRoute = {
    paramMap: of({ get: (param: string) => '1' })
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPokemonDetails when initialized', () => {
    spyOn(component, 'getPokemonDetails');
    component.ngOnInit();
    expect(component.getPokemonDetails).toHaveBeenCalled();
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call getPokemonDetails with a valid pokemonId', () => {
    const mockHttpClient = TestBed.inject(HttpClient);
    spyOn(mockHttpClient, 'get').and.returnValue(of({ name: 'Pikachu' }));

    component.ngOnInit();
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.Base_Url}/pokemon/1`);
    expect(component.pokemon).toEqual({ name: 'Pikachu' });
  });

  it('should handle error when getPokemonDetails receives an invalid pokemonId', () => {
    const mockHttpClient = TestBed.inject(HttpClient);
    spyOn(mockHttpClient, 'get').and.returnValue(throwError('Invalid ID'));
    spyOn(console, 'error');

    component.ngOnInit();
    expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.Base_Url}/pokemon/1`);
    expect(console.error).toHaveBeenCalledWith('Error fetching Pokemon details', 'Invalid ID');
  });
});
