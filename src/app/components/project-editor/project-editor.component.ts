import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReadResponse } from '../../interfaces/responses/readresponse';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  providers: [ProjectService]
})
export class ProjectEditorComponent implements OnInit {

  arApp: ReadResponse;
  loadingProjects: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.loadingProjects = true;

    this.route.params.subscribe(params => {
      this.projectService.getArApp({ id: params['id'] })
        .subscribe(
          res => {
            this.arApp = res.body;
            this.loadingProjects = false;
          },
          err => {
            console.log("Error occurred");
          }
        )
    });
  }

}
