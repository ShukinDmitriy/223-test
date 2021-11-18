import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from '@app/modules/home/home.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JsonInterceptor} from "@app/interceptors/json.interceptor";
import {CommonModule} from "@angular/common";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonInterceptor,
      multi: true,
    }
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    HttpClientModule,
  ]
})

export class AppModule {
}
