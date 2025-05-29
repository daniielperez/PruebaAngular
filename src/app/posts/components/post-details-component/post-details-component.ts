import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-post-details-component',
  standalone: false,
  templateUrl: './post-details-component.html',
  styleUrl: './post-details-component.scss',
})
export class PostDetailsComponent {
  post: any;
  isLoading = true;
  error: string | null = null;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null || isNaN(id)) {
      this.error = 'ID inválido';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.apiService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar el post';
        this.isLoading = false;
      },
    });
  }

  retry(): void {
    this.loadPost();
  }
}
