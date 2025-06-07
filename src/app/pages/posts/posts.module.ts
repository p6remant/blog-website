import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, RouterModule, PostsRoutingModule],
})
export class PostsModule {}
