import { Component, OnInit, Directive } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../services/project.service';
import { ReadAllSummaryResponse } from '../../interfaces/responses/readallsummaryresponse';
import { CreateRequest } from '../../interfaces/requests/createrequest';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {
  readAllSummaryResponse: ReadAllSummaryResponse;
  loadingProjects: boolean;
  createRequest: CreateRequest;
  createProjectModalReference: NgbModalRef;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.loadProjects();

    this.createRequest = {
      title: "",
      description: "",
      framework: "artoolkit",
      author: "John Doe",
      markers: [],
      resources: [],
      interfaces: []

    };
  }

  openModal(content) {
    this.createProjectModalReference = this.modalService.open(content);
  }

  private loadProjects() {
    this.loadingProjects = true;

    this.projectService.getAllSummaryArApps()
      .subscribe(
        res => {
          this.readAllSummaryResponse = res.body;
          this.loadingProjects = false;
        },
        err => {
          console.log("Error occurred");
        }
      );
  }

  createProject() {
    this.projectService.createArApp(this.createRequest)
      .subscribe(
        res => {
          console.log("Created: " + res.body.id);
          this.router.navigate(['/edit', res.body.id]);
          this.createProjectModalReference.close();
        },
        err => {
          console.log("Error occurred");
        }
      );
  }

}
