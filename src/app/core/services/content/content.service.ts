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
import { filter, map, tap } from 'rxjs/operators';
import { ContentFacade } from '@store/content/content.facade';

@Injectable({providedIn: 'root'})

export class ContentService {

  readonly API_CONTENT = environment.api + 'content/';
  page = 0;

  constructor(
    private http: HttpService,
    private contentFacade: ContentFacade
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

  public updateContent(
    article: Article
  ): Observable<Article> {
    return this.http
      .put<DraftResponse>(this.API_CONTENT, {article})
      .pipe(
        filter(res => res && !!res.ok),
        tap(res => this.contentFacade.setBySlug(res.draft)),
        map(res => res.draft)
      );
  }

  public resetPage(): void {
    this.page = 0;
  }

}


