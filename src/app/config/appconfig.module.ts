import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppConfigService } from './appconfig.service';

export function init_app(appConfigService: AppConfigService) {
    return () => appConfigService.load();
}

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppConfigService], multi: true }
  ]
})
export class AppConfigModule { }
