import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUser} from "../../models/loginUser.model";
import {REST_API_URL} from "../../helpers/http-request-helper";
import {throwError} from "rxjs";
import AppError from "../../errors/app-error";
import {catchError} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService) {
  }

  login(user: LoginUser) {
    return this.httpClient.post<any>(REST_API_URL + '/signin', user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(new AppError(error));
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('jwt-token');
  }

  isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }
}
