import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipePipe } from './pipes/shorten-pipe.pipe';
import { UserNamePipePipe } from './pipes/user-name-pipe.pipe';
import { TimeAgoPipePipe } from './pipes/time-ago-pipe.pipe';
import { HighlightDirective } from './directives/hightlight.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipePipe,
    UserNamePipePipe,
    TimeAgoPipePipe,
    HighlightDirective,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule,
    ShortenPipePipe,
    UserNamePipePipe,
    TimeAgoPipePipe,
    HighlightDirective,
    RouterModule,
  ],
})
export class SharedModule {}
