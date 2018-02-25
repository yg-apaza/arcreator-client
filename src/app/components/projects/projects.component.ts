import { Component, OnInit, Directive } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Arapps } from '../../interfaces/arapps'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  providers: [ProjectService]
})

export class ProjectsComponent implements OnInit {

  arapps: Arapps;
  loadingProjects: boolean;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.loadingProjects = true;
    this.projectService.getAllArapps()
      .subscribe(
        res => {
          console.log(res);
          this.arapps = res.body;
          this.loadingProjects = false;
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
