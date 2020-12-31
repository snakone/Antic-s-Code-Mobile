import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { environment } from '@env/environment';
import { DraftResponse, Draft } from '@shared/interfaces/interfaces';
import { filter, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class DraftsService {

  readonly API_DRAFTS = environment.api + 'drafts/';

  constructor(private http: HttpService) { }

  public createDraft(draft: Draft): Observable<Draft> {
    return this.http
      .post<DraftResponse>(this.API_DRAFTS, draft)
      .pipe(
        filter(res => res && !!res.ok),
        map(res => res.draft)
      );
  }

  public deleteDraftById(
    id: string
  ): Observable<Draft> {
    return this.http
    .delete<DraftResponse>(this.API_DRAFTS + id)
    .pipe(
      filter(res => res && !!res.ok),
      map(res => res.draft)
    );
  }

}
