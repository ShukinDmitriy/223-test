import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "@app/modules/comment/services/comment.service";
import {Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {CommentEntity} from "@app/modules/comment/entities/comment.entity";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-module-comment-component-comment',
  styleUrls: ['./comment.component.scss'],
  templateUrl: './comment.component.html',
})

export class CommentComponent implements OnInit, OnDestroy {

  @Input() parentId: number | null = null;

  comments: CommentEntity[] = [];
  viewChild: Set<number> = new Set();
  openAnswer: Set<number> = new Set();

  private unsubscribe$ = new Subject();

  public constructor(
    private commentService: CommentService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.loadComments();

    this.commentService.updatedComment$
      .pipe(
        filter(updatedCommentId => updatedCommentId && updatedCommentId === this.parentId),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(updatedCommentId => {
        this.loadComments();
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadComments(): void {
    const params: CommentEntity = {};
    if (this.parentId) {
      params.parent_id = this.parentId;
    }
    this.commentService.getComments(params)
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(comments => {
        this.comments = comments;
        this.cdr.markForCheck();
      });
  }

  trackFn(index: number, comment: CommentEntity): number {
    return comment.id;
  }

  prepareHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  afterAnswerWasAdded(commentId: number): void {
    this.openAnswer.delete(commentId);
    this.viewChild.add(commentId);
  }
}
