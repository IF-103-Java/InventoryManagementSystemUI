import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from "./item/item.service";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemTableComponent} from "./item/item-table/item-table.component";
import {ItemSortableDirective} from "./item/item-sortable.directive";
import {UserSigninComponent} from "./user/user-signin/user-signin.component";
import {UserSignupComponent} from "./user/user-signup/user-signup.component";
import {UserUpdateComponent} from "./user/user-update/user-update.component";
import {UserForgotPasswordComponent} from "./user/user-forgot-password/user-forgot-password.component";
import {UserResetPasswordComponent} from "./user/user-reset-password/user-reset-password.component";
import {RegistrationService} from "./user/services/registration-service.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {LoginService} from "./user/services/login.service";
import {ResetPasswordService} from "./user/services/reset-password.service";
import {JwtModule} from "@auth0/angular-jwt";
import {GlobalErrorHandler} from "./errors/global-error-handler";

export function tokenGetter() {
  let jwtToken = '';
  if (sessionStorage.getItem('jwt-token')) {
    jwtToken = sessionStorage.getItem('jwt-token').substr(7);
  }
  return jwtToken;
}

@NgModule({
  declarations: [
    AppComponent,
    ItemCreateComponent,
    ItemTableComponent,
    ItemSortableDirective,
    UserSigninComponent,
    UserSignupComponent,
    UserUpdateComponent,
    UserForgotPasswordComponent,
    UserResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: [''],
        skipWhenExpired: true
      }
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ItemService,
    RegistrationService,
    LoginService,
    ResetPasswordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
