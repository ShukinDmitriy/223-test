import {Injectable} from "@angular/core";
import {Observable, of, Subject} from "rxjs";
import {CommentEntity} from "@app/modules/comment/entities/comment.entity";
import {comments} from "./comments";
import {catchError, switchMap, tap} from "rxjs/operators";

@Injectable()
export class MockCommentService {

  private comments: CommentEntity[] = [];
  private maxId = 0;
  private _updatedComment$: Subject<number> = new Subject();

  get updatedComment$() {
    return this._updatedComment$.asObservable();
  }

  constructor(
  ) {
    this.comments = comments;
    this.maxId = this.comments.sort((a, b) => a.id > b.id ? -1 : 1)[0].id;
  }

  public getComments(query: CommentEntity = {}): Observable<CommentEntity[]> {
    query.parent_id = query.parent_id || null;
    return of(this.comments)
      .pipe(
        switchMap(comments => {
          return of(comments.filter((comment) => {
            for (const param in query) {
              if (query.hasOwnProperty(param) && comment[param] !== query[param]) {
                return false;
              }
            }
            return true;
          }).sort((a, b) => a.id > b.id ? -1 : 1));
        }),
      );
  }

  public createComment(comment: CommentEntity): Observable<CommentEntity> {
    comment.id = ++this.maxId;
    const now = new Date();
    comment.date_time = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
    this.comments.push(comment);
    return of(comment)
      .pipe(
        tap(_ => this._updatedComment$.next(comment.parent_id)),
      );
  }

}
