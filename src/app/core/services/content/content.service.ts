import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

import {
  Article,
  ArticleResponse,
  ArticlesDataResponse,
  ContentResponse,
  DraftResponse } from '@shared/interfaces/interfaces';

import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { filter, map } from 'rxjs/operators';
import { CategoryAvatar } from '@shared/interfaces/interfaces';

@Injectable({providedIn: 'root'})

export class ContentService {

  readonly API_CONTENT = environment.api + 'content/';
  page = 0;
  public selected: CategoryAvatar;

  constructor(
    private http: HttpService
  ) { }

  public get(
    sort: string = 'any'
  ): Observable<ContentResponse> {
    this.page++;
    return this.http
      .get<ContentResponse>(this.API_CONTENT + '?sort=' + sort + '&page=' + this.page)
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

  public getData(): Observable<ArticlesDataResponse> {
    return this.http
      .get<ArticlesDataResponse>(environment.api + 'articles-data')
      .pipe(
        filter(res => res && !!res.ok)
      );
  }

  public updateContentMessage(
    article: Article
  ): Observable<Article> {
    return this.http
      .put<DraftResponse>(this.API_CONTENT + 'message/', {article})
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

}


