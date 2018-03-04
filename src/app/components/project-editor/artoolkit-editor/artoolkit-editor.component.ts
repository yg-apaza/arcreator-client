import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Markers } from './markers';
import { ReadResponse } from '../../../interfaces/responses/readresponse';
import { PolyService } from '../../../services/poly.service';
import { AppSettings } from '../../../appSettings';
import 'rxjs/add/operator/map';

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
  selectedMarkerName: string;
  selectedMarkerImage: string;

  markerImageList: Array<string>;

  // Add new resource
  keywords: string;
  resultResources: Array<any>;
  selectedResourceUrl: string;

  resourceImageList: Array<string>;

  constructor(
    private modalService: NgbModal,
    private polyService: PolyService
  ) { }

  ngOnInit() {
    this.availableMarkers = Markers.availableMarkers;
    this.markerImageList = [];
    this.resourceImageList = [];

    for (let markerName of this.arApp.markers) {
      this.markerImageList.push(this.getMarkerPath(markerName));
    }

    let promises = [];

    for (let resourceUrl of this.arApp.resources) {
      promises.push(new Promise((resolve, reject) => {
        this.getResourceThumbnail(resourceUrl.url, (url) => {
          resolve(url);
        });
      }));
    }

    Promise.all(promises)
      .then((results) => {
        this.resourceImageList = results;
      });

  }

  openAddMarkerModal(content) {
    this.addMarkerModalReference = this.modalService.open(content);
  }

  openAddResourceModal(content) {
    this.addResourceModalReference = this.modalService.open(content);
  }

  addMarker() {
    this.arApp.markers.push(this.selectedMarkerName);
    this.markerImageList.push(this.selectedMarkerImage);
    this.addMarkerModalReference.close();
  }

  private getMarkerPath(name: string): string {
    return this.availableMarkers.find(m => m.name == name).path;
  }

  searchKeywords() {
    this.polyService.listAssets({ keywords: this.keywords, format: 'OBJ', pageSize: '12', key: AppSettings.POLY_API_KEY })
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
    this.arApp.resources.push({ name: this.selectedResourceUrl, type: 'poly', url: this.selectedResourceUrl });
    this.getResourceThumbnail(this.selectedResourceUrl, (url) => {
      this.resourceImageList.push(url);
    });
    this.addResourceModalReference.close();
  }

  private getResourceThumbnail(url: string, callback: (url: string) => any) {

    this.polyService.getAsset(url, { key: AppSettings.POLY_API_KEY })
      .subscribe(
        res => {
          callback(res.body.thumbnail.url);
        },
        err => {
          console.log("Error occurred");
        }
      )
  }
}
