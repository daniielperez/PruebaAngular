import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list-component',
  standalone: false,
  templateUrl: './post-list-component.html',
  styleUrl: './post-list-component.scss',
})
export class PostListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        setTimeout(() => (this.dataSource.paginator = this.paginator));
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
