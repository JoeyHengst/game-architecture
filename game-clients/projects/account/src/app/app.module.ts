import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import {SocketIoModule}     from "ngx-socket-io";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot({
      url: 'ws://localhost:3000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
