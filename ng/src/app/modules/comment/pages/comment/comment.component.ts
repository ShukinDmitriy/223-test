import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-module-comment-page-comment',
  styleUrls: ['./comment.component.scss'],
  templateUrl: './comment.component.html',
})

export class CommentComponent implements OnInit, OnDestroy {

  public constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
