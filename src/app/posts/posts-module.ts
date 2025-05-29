import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './components/post-list-component/post-list-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostDetailsComponent } from './components/post-details-component/post-details-component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [PostListComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PostsRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class PostsModule {}
