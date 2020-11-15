import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Article, ArticleResponse, ContentResponse } from '@shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { filter, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class ContentService {

  readonly API_CONTENT = environment.api + 'content/';

  constructor(
    private http: HttpService
  ) { }

  public get(
    sort: string = 'any'
  ): Observable<ContentResponse> {
    return this.http
      .get<ContentResponse>(this.API_CONTENT + '?sort=' + sort)
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

  public getBySlug(
    slug: string
  ): Observable<Article> {
    return this.http
      .get<ArticleResponse>(this.API_CONTENT + slug)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.article)
      );
  }

}


