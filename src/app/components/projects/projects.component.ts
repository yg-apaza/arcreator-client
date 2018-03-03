import { Component, OnInit, Directive } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../services/project.service';
import { ReadAllSummaryResponse } from '../../interfaces/responses/readallsummaryresponse';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {
  readAllSummaryResponse: ReadAllSummaryResponse;
  loadingProjects: boolean;

  constructor(private projectService: ProjectService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadingProjects = true;
    this.projectService.getAllArapps()
      .subscribe(
        res => {
          console.log(res);
          this.readAllSummaryResponse = res.body;
          this.loadingProjects = false;
        },
        err => {
          console.log("Error occured");
        }
      );
  }
  
  openModal(content){
    this.modalService.open(content);
  }

}
