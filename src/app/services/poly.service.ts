import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PolyListRequest } from '../interfaces/requests/polylistrequest';
import { PolyGetRequest } from '../interfaces/requests/polygetrequest';


@Injectable()

export class PolyService {

  public static POLY_ENDPOINT = "https://poly.googleapis.com/v1";
  public static POLY_LIST_ENDPOINT = PolyService.POLY_ENDPOINT + "/assets";

  constructor(private http: HttpClient) { }

  listAssets(polyListRequest: PolyListRequest): Observable<HttpResponse<any>> {
    return this.http.get<PolyListRequest>(PolyService.POLY_LIST_ENDPOINT, { params: { ...polyListRequest }, observe: 'response' });
  }

  getAsset(name: string, polyGetRequest: PolyGetRequest): Observable<HttpResponse<any>> {
    return this.http.get<PolyGetRequest>(PolyService.POLY_LIST_ENDPOINT + '/' + name + '/', { params: { ...polyGetRequest }, observe: 'response' });
  }

}
