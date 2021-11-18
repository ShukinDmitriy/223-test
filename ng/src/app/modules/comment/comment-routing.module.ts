import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommentComponent} from "@app/modules/comment/pages/comment/comment.component";


const routes: Routes = [
  {path: '', component: CommentComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CommentRoutingModule {
}
