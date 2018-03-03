import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtoolkitEditorComponent } from './artoolkit-editor.component';

describe('ArtoolkitEditorComponent', () => {
  let component: ArtoolkitEditorComponent;
  let fixture: ComponentFixture<ArtoolkitEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtoolkitEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtoolkitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
