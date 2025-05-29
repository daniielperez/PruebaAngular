import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list-component';
import { ApiService } from '../../services/api.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getPosts']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
      ],
      providers: [{ provide: ApiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts correctly', () => {
    const mockPosts = [{ id: 1, title: 'Post de prueba' }];
    apiServiceSpy.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(component.posts.length).toBe(1);
    expect(component.error).toBeNull();
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error loading posts', () => {
    apiServiceSpy.getPosts.and.returnValue(
      throwError(() => new Error('Error al cargar'))
    );

    component.ngOnInit();

    expect(component.posts.length).toBe(0);
    expect(component.error).toBe('Error al cargar los posts');
    expect(component.isLoading).toBeFalse();
  });
});
