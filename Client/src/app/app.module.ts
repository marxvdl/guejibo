import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GamebannerComponent } from './gamebanner/gamebanner.component';
import { GamebannersComponent } from './gamebanners/gamebanners.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopbarComponent,
    GamebannerComponent,
    GamebannersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
