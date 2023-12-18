import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PostService } from '../services/social-media.service';
import { Post } from '../models/post.model';

export const postResolver: ResolveFn<Post[]> = (route, state) => {
  return inject(PostService).getPosts();
};
