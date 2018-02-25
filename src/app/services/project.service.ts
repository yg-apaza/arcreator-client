import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { Arapps } from '../interfaces/arapps'

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }
  getAllArapps(): Observable<HttpResponse<Arapps>> {
    return this.http.get<Arapps>(AppSettings.arapp, {observe: 'response'});
  }
}
