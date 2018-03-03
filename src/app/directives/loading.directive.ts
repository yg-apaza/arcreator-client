import { Directive, ComponentFactory, ComponentRef, TemplateRef, ViewContainerRef, Input, ComponentFactoryResolver } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Directive({
  selector: '[apploading]'
})

export class LoadingDirective {
  loadingFactory: ComponentFactory<LoadingComponent>;

  @Input()
  set apploading(loading: boolean) {
    this.vcRef.clear();

    if (loading) {
      this.vcRef.createComponent(this.loadingFactory);
    }
    else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  }
}
