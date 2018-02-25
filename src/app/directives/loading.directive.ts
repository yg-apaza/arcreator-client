import { Directive, ComponentFactory, ComponentRef, TemplateRef, ViewContainerRef, Input, ComponentFactoryResolver  } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Directive({
  selector: '[apploading]'
})

export class LoadingDirective {
  loadingFactory : ComponentFactory<LoadingComponent>;

  @Input() 
  set apploading(loading: boolean) {
    this.vcRef.clear();

    if (loading)
    {
      // create and embed an instance of the loading component
      this.vcRef.createComponent(this.loadingFactory);
    }
    else
    {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }    
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {
    // Create resolver for loading component
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
  }
}
