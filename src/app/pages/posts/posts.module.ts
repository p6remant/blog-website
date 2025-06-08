import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PostDetailsComponent,
  ],
})
export class PostsModule {}
