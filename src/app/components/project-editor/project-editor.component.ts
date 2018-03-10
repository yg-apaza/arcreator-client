import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ReadResponse } from '../../interfaces/responses/readresponse';
import { ProjectService } from '../../services/project.service';
import 'rxjs/add/operator/switchMap';

declare var Blockly: any;

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  providers: [ProjectService]
})
export class ProjectEditorComponent implements OnInit {

  arApp: ReadResponse;
  loadingProjects: boolean;
  public alerts: Array<any> = [];

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

  save() {
    let code: string = Blockly.JSON.workspaceToCode();
    this.arApp.interfaces = JSON.parse(code).interfaces;

    this.projectService.updateArApp(this.arApp)
      .subscribe(
        res => {
          this.alerts.push({
            type: 'success',
            message: 'Project saved !',
          });
        },
        err => {
          this.alerts.push({
            type: 'danger',
            message: 'An error occurred',
          });
        }
      );
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
