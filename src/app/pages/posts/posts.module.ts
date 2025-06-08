import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PostDetailsComponent,
    PostEditComponent,
  ],
})
export class PostsModule {}
