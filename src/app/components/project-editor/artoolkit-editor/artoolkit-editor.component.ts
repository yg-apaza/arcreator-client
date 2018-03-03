import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Markers } from './markers';
import { ReadResponse } from '../../../interfaces/responses/readresponse';
import { PolyService } from '../../../services/poly.service';
import { AppSettings } from '../../../appSettings'
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-artoolkit-editor',
  templateUrl: './artoolkit-editor.component.html',
  styleUrls: ['./artoolkit-editor.component.css'],
  providers: [PolyService]
})
export class ArtoolkitEditorComponent implements OnInit {

  @Input() arApp: ReadResponse;

  addMarkerModalReference: NgbModalRef;
  addResourceModalReference: NgbModalRef;

  // Add new marker
  availableMarkers: Array<any>;
  selectedMarker: string;

  // Add new resource
  keywords: string;
  resultResources: Array<any>;
  selectedResource: string;
  resourcesURLs: Array<string>;

  constructor(
    private modalService: NgbModal,
    private polyService: PolyService
  ) { }

  ngOnInit() {
    this.availableMarkers = Markers.availableMarkers;
  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  openAddResourceModal(content) {
    this.addResourceModalReference = this.modalService.open(content);
  }

  addMarker() {
    this.arApp.markers.push(this.selectedMarker);
    this.addMarkerModalReference.close();
  }

  getMarkerPath(name: string): string {
    console.log("getMarkerPath");
    return this.availableMarkers.find(m => m.name == name).path;
  }

  searchKeywords() {
    this.polyService.list({ keywords: this.keywords, format: 'OBJ', pageSize: '12', key: AppSettings.POLY_API_KEY })
      .subscribe(
        res => {
          this.resultResources = res.body.assets;
        },
        err => {
          console.log("Error occurred");
        }
      )
  }

  addResource() {
    this.arApp.resources.push({ name: this.selectedResource, type: 'poly', url: this.selectedResource });
    console.log(this.arApp);
    this.addResourceModalReference.close();
  }

  getResourceThumbnail(url: string): any {
    console.log("getResourceThumbnail");
    /*
    this.polyService.get(url, { key: AppSettings.POLY_API_KEY })
      .subscribe(
        res => {
          console.log(res);
          return res.body.thumbnail.url;
        },
        err => {
          console.log("Error occurred");
          return "";
        }
      );
      */
    return "";

  }
}
