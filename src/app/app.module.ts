import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './shared/services/login.service';
import { getToken } from './token-getter';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AnnonceService } from './shared/services/annonce.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [environment.endpoint, 'localhost:8080'],
        throwNoTokenError: false
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
