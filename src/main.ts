import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { loadTranslations } from "@angular/localize";

if (environment.production) {
  enableProdMode();
}

loadTranslations({
  "9169252125508909250": "Tour of Heroes",
  de0dac7188ab04270cfc534db751465ca525b05e: "Welcome1 to1 {$INTERPOLATION}!",
  c37ed5be5e3bea5b66866cf2931599965b18cd72: "This1 is1 demo1",
  "437bc92e3ff7cc194530253b3c2dc3339fc6f699":
    " This1 is1 translation1 with1 {$START_TAG_SPAN}HTML1{$CLOSE_TAG_SPAN}{$START_TAG_STRONG}tags1{$CLOSE_TAG_STRONG}{$START_LINK}inside1{$CLOSE_LINK}",
  d13483b6c95ecd115536b6227f59a41089bb63ff:
    "Here1 are some links to {$START_TAG_SPAN}this1{$CLOSE_TAG_SPAN} help you start1:",
  d6cec643d19c2a2a8370673d27681775093e0322:
    "{VAR_PLURAL, plural, =0 {No guests1} =1 {Single guest1} other {{$INTERPOLATION} lalala1}}",
  a2a6bfdb8166a1170162fd1a6e2ae1e35eff6eda:
    "{VAR_SELECT, select, male {He went home1} female {She went home1} other {They went\n" +
    "  home1}}",
  "82c2d3e7da3019ef30dc7b2a8e71aff8b88ceffa":
    "{VAR_SELECT, select, morning {Good morning1} afternoon {Good afternoon1} evening {Good evening1} night {Good night1}}",
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
