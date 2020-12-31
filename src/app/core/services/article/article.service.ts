import { Injectable} from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ArticleResponse, Article} from '@shared/interfaces/interfaces';

import { filter, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ArticleService {

  readonly API_ARTICLES = environment.api + 'articles/';
  public page = 0;

  constructor(private http: HttpService) { }

  public get(): Observable<Article[]> {
    this.page++;
    return this.http
      .get<ArticleResponse>(this.API_ARTICLES + '?page=' + this.page)
      .pipe(
        filter(res => res && !!res.ok),
        map(_ => _.articles)
      );
  }

  public resetPage(): void {
    this.page = 0;
  }

}
