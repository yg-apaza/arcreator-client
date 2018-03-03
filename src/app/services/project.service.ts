import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { ReadAllSummaryResponse } from '../interfaces/responses/readallsummaryresponse'

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }
  getAllArapps(): Observable<HttpResponse<ReadAllSummaryResponse>> {
    return this.http.get<ReadAllSummaryResponse>(AppSettings.arapp, {observe: 'response'});
  }
}
