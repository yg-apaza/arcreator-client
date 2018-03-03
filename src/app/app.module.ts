import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoadingDirective } from './directives/loading.directive';
import { LoadingComponent } from './components/loading/loading.component';
import { ProjectEditorComponent } from './components/project-editor/project-editor.component';
import { ArtoolkitEditorComponent } from './components/project-editor/artoolkit-editor/artoolkit-editor.component';

const appRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'edit/:id',
    component: ProjectEditorComponent
  },
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    LoadingDirective,
    AppComponent,
    ProjectsComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ProjectEditorComponent,
    ArtoolkitEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoadingComponent
  ]
})

export class AppModule { }
