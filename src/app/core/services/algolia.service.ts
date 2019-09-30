import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Algolia } from '../interfaces/algolia.interface';

@Injectable()
export class AlgoliaService {
  apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Algolia> {
    const httpParams = new HttpParams();
    const params = httpParams.set('tags', 'story');
    return this.http.get<Algolia>(this.apiUrl, { params });
  }
}
