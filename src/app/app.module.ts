import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ObjectsOutputComponent } from './objects/components/objects-output/objects-output.component';
import { ForDirective } from './objects/directives/ng-for-object.directive';

@NgModule({
  declarations: [AppComponent, ObjectsOutputComponent, ForDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
