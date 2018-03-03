import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { ReadAllSummaryResponse } from '../interfaces/responses/readallsummaryresponse'
import { CreateRequest } from '../interfaces/requests/createrequest';
import { CreateResponse } from '../interfaces/responses/createresponse';
import { ReadRequest } from '../interfaces/requests/readrequest';
import { ReadResponse } from '../interfaces/responses/readresponse';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllSummaryArApps(): Observable<HttpResponse<ReadAllSummaryResponse>> {
    return this.http.get<ReadAllSummaryResponse>(AppSettings.API_ARAPP, { observe: 'response' });
  }

  getArApp(readRequest: ReadRequest): Observable<HttpResponse<ReadResponse>> {
    return this.http.get<ReadResponse>(AppSettings.API_ARAPP + '/' + readRequest.id, { observe: 'response' });
  }

  createArApp(createRequest: CreateRequest): Observable<HttpResponse<CreateResponse>> {
    return this.http.post<CreateResponse>(AppSettings.API_ARAPP, createRequest, { observe: 'response' });
  }
}
