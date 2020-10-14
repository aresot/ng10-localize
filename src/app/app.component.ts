import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "ng10-localize";
  hours = 10;
  guests = 0;
  gender = "female";
  label1 = $localize`Tour of Heroes`;

  // get time(): string {
  //   if (this.hours > 5 && this.hours < 12) {
  //     return "morning";
  //   }
  //   if (this.hours >= 12 && this.hours < 18) {
  //     return "afternoon";
  //   }
  //   if (this.hours >= 18 && this.hours < 22) {
  //     return "evening";
  //   }
  //   return "night";
  // }

  // test = $localize`${this.guests}, plural, =0 {Zero guests} =1 {One guest} other {${this.guests} guests}`;
}
