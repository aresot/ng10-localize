import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TimeOfDayPipe } from "./tod.pipe";

@NgModule({
  declarations: [AppComponent, TimeOfDayPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TimeOfDayPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
