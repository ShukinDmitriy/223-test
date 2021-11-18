import {Injectable} from "@angular/core";
import {environment} from "@env/environment";
import {Observable, of, Subject} from "rxjs";
import {CommentEntity} from "@app/modules/comment/entities/comment.entity";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class CommentService {
  private commentsUrl = environment.url.api + '/comments';
  private _updatedComment$: Subject<number> = new Subject();

  get updatedComment$() {
    return this._updatedComment$.asObservable();
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  public getComments(query: CommentEntity = {}): Observable<CommentEntity[]> {
    const params = {};
    for (const param in query) {
      if (query.hasOwnProperty(param)) {
        params[param] = query[param].toString();
      }
    }

    return this.http.get<CommentEntity[]>(this.commentsUrl, {params})
      .pipe(
        catchError((err) => {
          console.log(err);
          return of([] as CommentEntity[]);
        }),
      );
  }

  public createComment(comment: CommentEntity): Observable<CommentEntity> {
    return this.http.post<CommentEntity>(this.commentsUrl, comment)
      .pipe(
        tap(_ => this._updatedComment$.next(comment.parent_id)),
        catchError((err) => {
          console.log(err);
          return of(comment);
        }),
      )
  }
}
