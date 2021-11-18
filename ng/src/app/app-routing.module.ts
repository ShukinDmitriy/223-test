import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '@app/modules/home/pages/home/home.component';
import {HomeModule} from '@app/modules/home/home.module';
import {NotFoundComponent} from '@app/modules/not-found/pages/not-found/not-found.component';
import {NotFoundModule} from '@app/modules/not-found/not-found.module';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'comment',
    loadChildren: () => import('./modules/comment/comment.module').then((m) => m.CommentModule),
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    HomeModule,
    NotFoundModule,
    RouterModule.forRoot(
        routes
    )
  ]
})

export class AppRoutingModule {
}
