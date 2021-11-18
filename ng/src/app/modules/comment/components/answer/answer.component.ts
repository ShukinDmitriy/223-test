import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommentEntity} from "@app/modules/comment/entities/comment.entity";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {markFormGroupTouched} from "@app/functions/mark-from-group-touched";
import {CommentService} from "@app/modules/comment/services/comment.service";
import {takeUntil, tap} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-module-comment-component-answer',
  styleUrls: ['./answer.component.scss'],
  templateUrl: './answer.component.html',
})

export class AnswerComponent implements OnInit, OnDestroy {

  @Input() comment: CommentEntity | undefined;
  @Output() answerWasAdded$: EventEmitter<void> = new EventEmitter<void>();

  form = new FormGroup({
    id: new FormControl(null, []),
    parent_id: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
    date_time: new FormControl(null, []),
    author_name: new FormControl(null, [Validators.required, Validators.maxLength(256)]),
    body: new FormControl(null, [Validators.required, Validators.maxLength(1000)]),
  });
  private submit = false;

  private unsubscribe$ = new Subject();
  public constructor(
    private commentService: CommentService,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {
    if (this.submit) {
      return;
    }
    this.submit = true;

    this.form.get('parent_id').patchValue(this.comment.id);
    if (!this.form.valid) {
      markFormGroupTouched(this.form);
      this.submit = false;
      return;
    }

    const comment = this.form.value as CommentEntity;
    this.commentService.createComment(comment)
      .pipe(
        tap(_ => this.submit = false),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(newComment => {
        if (newComment && newComment.id) {
          this.answerWasAdded$.next();
        }
      });
  }
}
