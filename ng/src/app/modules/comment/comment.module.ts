import {NgModule} from '@angular/core';
import {CommentRoutingModule} from "@app/modules/comment/comment-routing.module";
import {CommentComponent as PageCommentComponent} from "@app/modules/comment/pages/comment/comment.component";
import {CommentService} from "@app/modules/comment/services/comment.service";
import {environment} from "@env/environment.prod";
import {HttpClient} from "@angular/common/http";
import {MockCommentService} from "@app/modules/comment/mocks/mock-comment.service";
import {CommentComponent} from "@app/modules/comment/components/comment/comment.component";
import {CommonModule} from "@angular/common";
import {AnswerComponent} from "@app/modules/comment/components/answer/answer.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PageCommentComponent, CommentComponent, AnswerComponent],
  providers: [
    {
      provide: CommentService,
      useFactory: (http: HttpClient) => {
        if (environment.production) {
          return new CommentService(http);
        } else {
          return new MockCommentService();
        }
      },
      deps: [HttpClient],
    },
  ],
  exports: [],
  imports: [
    CommonModule,
    CommentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class CommentModule {
}
