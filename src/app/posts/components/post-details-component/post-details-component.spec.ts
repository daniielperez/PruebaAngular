import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';
import { PostDetailsComponent } from './post-details-component';

describe('PostDetailComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getPostById']);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // valor simulado del id
              },
            },
          },
        },
        { provide: ApiService, useValue: apiSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el post correctamente', () => {
    const mockPost = { id: 1, title: 'Post 1' };
    mockApiService.getPostById.and.returnValue(of(mockPost));

    component.ngOnInit();

    expect(mockApiService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual(mockPost);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('debería manejar error al cargar el post', () => {
    mockApiService.getPostById.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.ngOnInit();

    expect(mockApiService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toBeUndefined();
    expect(component.error).toBe('Error al cargar el post');
    expect(component.isLoading).toBeFalse();
  });

  it('debería mostrar error si el ID es inválido', () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('abc'); // ID no numérico

    component.ngOnInit();

    expect(component.error).toBe('ID inválido');
    expect(component.isLoading).toBeFalse();
  });

  it('debería volver a intentar cargar el post con retry()', () => {
    const mockPost = { id: 1, title: 'Retry Post' };
    mockApiService.getPostById.and.returnValue(of(mockPost));

    component.retry();

    expect(mockApiService.getPostById).toHaveBeenCalledWith(1);
    expect(component.post).toEqual(mockPost);
  });
});
