import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultModule } from "./default/default.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { HttpClientModule } from "@angular/common/http";


const notifierCustomOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "left",
          distance: 700
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
