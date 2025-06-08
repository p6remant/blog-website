import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    PostsRoutingModule,
    PostsComponent,
    PostDetailsComponent,
  ],
})
export class PostsModule {}
