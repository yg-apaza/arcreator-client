import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { ReadAllSummaryResponse } from '../interfaces/responses/readallsummaryresponse'
import { CreateRequest } from '../interfaces/requests/createrequest';
import { CreateResponse } from '../interfaces/responses/createresponse';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllSummaryArApps(): Observable<HttpResponse<ReadAllSummaryResponse>> {
    return this.http.get<ReadAllSummaryResponse>(AppSettings.arapp, { observe: 'response' });
  }

  createArApp(createRequest: CreateRequest): Observable<HttpResponse<CreateResponse>> {
    return this.http.post<CreateResponse>(AppSettings.arapp, createRequest, { observe: 'response' });
  }
}
