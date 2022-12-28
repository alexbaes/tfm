import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth.module';
import { MeetingModule } from './meeting.module';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AuthModule,
    MeetingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
