import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultModule } from "./default/default.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./services/jwt.interceptor";
import { ErrorInterceptor } from "./services/error.interceptor";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const notifierCustomOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "middle"
      },
      vertical: {
          position: "top",
          distance: 100,
          gap: 10
      }
  },
  theme: "material",
  behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
  },
  animations: {
      enabled: true,
      show: {
          preset: "slide",
          speed: 300,
          easing: "ease"
      },
      hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50
      },
      shift: {
          speed: 300,
          easing: "ease"
      },
      overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    NotifierModule.withConfig(notifierCustomOptions),
    HttpClientModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // })
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
