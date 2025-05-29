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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiService', ['getPosts']);

    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: ApiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar posts correctamente', () => {
    const mockPosts = [{ id: 1, title: 'Post 1' }];
    apiServiceSpy.getPosts.and.returnValue(of(mockPosts));

    component.loadPosts();

    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
    expect(component.dataSource.data.length).toBe(1);
  });

  it('debería manejar error al cargar posts', () => {
    apiServiceSpy.getPosts.and.returnValue(
      throwError(() => new Error('fallo'))
    );

    component.loadPosts();

    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe('Error al cargar los posts');
  });
});
