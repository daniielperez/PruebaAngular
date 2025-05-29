import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-list-component',
  standalone: false,
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss',
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar los posts';
        this.isLoading = false;
      },
    });
  }

  retry(): void {
    this.loadPosts();
  }
}
