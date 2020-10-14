import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { loadTranslations } from "@angular/localize";

if (environment.production) {
  enableProdMode();
}

loadTranslations({
  "9169252125508909250": "allalalalalalalalla",
  "437bc92e3ff7cc194530253b3c2dc3339fc6f699":
    "This1 is1 translation1 with1 {$START_TAG_SPAN}HTML1{$CLOSE_TAG_SPAN}{$START_TAG_STRONG}tags1{$CLOSE_TAG_STRONG}{$START_LINK}inside1{$CLOSE_LINK}",
  d6cec643d19c2a2a8370673d27681775093e0322:
    "{VAR_PLURAL, plural, =0 {No guests1} =1 {Single guest1} other {{$INTERPOLATION} lalala1}}",
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
