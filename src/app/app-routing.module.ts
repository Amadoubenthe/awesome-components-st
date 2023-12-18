import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'social-media',
    loadChildren: () =>
      import('./features/social-media/social-media.module').then(
        (m) => m.SocialMediaModule
      ),
  },
  {
    path: 'complex-form',
    loadChildren: () =>
      import('./features/complex-form/complex-form.module').then(
        (m) => m.ComplexFormModule
      ),
  },
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./features/reactive-state/reactive-state.module').then(
        (m) => m.ReactiveStateModule
      ),
  },
  { path: '**', redirectTo: 'social-media' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
