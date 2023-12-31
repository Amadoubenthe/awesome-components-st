import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostService } from './services/social-media.service';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostListComponent, PostListItemComponent],
  imports: [CommonModule, SocialMediaRoutingModule, SharedModule],
  providers: [PostService],
})
export class SocialMediaModule {}
