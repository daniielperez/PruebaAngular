import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list-component/post-list-component';
import { PostDetailsComponent } from './components/post-details-component/post-details-component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'details/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
