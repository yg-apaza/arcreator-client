import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Markers } from './markers';
import { ReadResponse } from '../../../interfaces/responses/readresponse';

@Component({
  selector: 'app-artoolkit-editor',
  templateUrl: './artoolkit-editor.component.html',
  styleUrls: ['./artoolkit-editor.component.css']
})
export class ArtoolkitEditorComponent implements OnInit {

  @Input() arApp: ReadResponse;

  addMarkerModalReference: NgbModalRef;
  addResourceModalReference: NgbModalRef;

  availableMarkers: Array<any>;
  markerSelected: string;

  constructor(
    private modalService: NgbModal
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

  addMarker(){
    this.arApp.markers.push(this.markerSelected);
    this.addMarkerModalReference.close();
  }

  getMarkerPath(name: string): string {
    return this.availableMarkers.find(m => m.name == name).path;
  }
}
