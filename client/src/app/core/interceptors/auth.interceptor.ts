import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, firstValueFrom, map, throwError } from 'rxjs';
import { IConfigApiByRole } from 'src/app/shared/model/mc-config.model';
import { McConfigService } from '../../shared/service/mc-config.service';
import { ErrorService } from '../service/error.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userToken: string;
  private dataToken!: any;
  FIRST_INDEX = 0;
  check = 1;
  dataRoleApi!: IConfigApiByRole[];

  constructor(
    private cookieService: CookieService,
    private configMcService: McConfigService,
    private errorService: ErrorService
  ) {
    this.userToken = this.cookieService.get('accessToken')
      ? this.cookieService.get('accessToken')
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFTUE9UTzM5IiwidGltZXN0YW1wIjoiMjAyMzA4MzExMDEwIiwibG9jYXRpb25Db2RlIjoiOTc0MzkiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4lOC4suC4o-C4suC4geC4suC4meC4leC5jCIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJBU1BPVE8zOSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJBU1AiLCJvdXRQb3NpdGlvbiI6Ik1hbmFnZXIiLCJvdXRDaG5TYWxlcyI6IkFJUyBieSBQYXJ0bmVyIiwib3V0Q2huU2FsZXNDb2RlIjoiQVNQIiwib3UiOiJQQVJUTkVSIiwiaWF0IjoxNjkzNDUxNDAyLCJleHAiOjk5OTk5OTk5OTl9.Vr05CYMEo6zUnhpFjfIKwzKjlUN9mlSa2X4CsLM4PpY';
    // : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRNQkNNUzg4IiwidGltZXN0YW1wIjoiMjAyMzA4MzExNDM2IiwibG9jYXRpb25Db2RlIjoiNTAxODUiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4quC4uOC4geC4seC4jeC4jeC4siIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJUTUJDTVM4OCIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTQyBUVyIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJURUxFV0laIiwib3V0UG9zaXRpb24iOiJNYW5hZ2VyIiwib3V0Q2huU2FsZXMiOiJUZWxld2l6Iiwib3V0Q2huU2FsZXNDb2RlIjoiVEVMRVdJWiIsIm91IjoiUEFSVE5FUiIsImlhdCI6MTY5MzQ2NzQyMCwiZXhwIjo5OTk5OTk5OTk5fQ.wq3dWL-nJNagJfl5b35xie-xf62cFcyAJtGTOc-sWlA'
    }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const urlPath = request.url;
    if (!this.dataRoleApi) {
      this.getDataFromApi();
    }

    this.dataToken = jwt_decode(this.userToken);
    let isActive = false;
    const isConficMCPath =
      urlPath === '/api/device-sales/v1/mc/config/getConfigMC';
    if (isConficMCPath) {
      isActive = true;
    } else {
      const filteredRole =
        (
          this.dataRoleApi?.filter((res: any) =>
            urlPath?.includes(res?.nameApi)
          )[this.FIRST_INDEX] || {}
        )?.role || '';

      isActive = filteredRole.includes(this.dataToken?.role);
    }
    if (!isActive) {
      return throwError(() => new Error(urlPath + ' Request canceled Role: ' + this.dataToken?.role + 'not have permission'));
    }
    const modifiedRequest = request.clone({
      setHeaders: {
        'x-authorization': `Bearer ${this.userToken}`,
      },
    });
    return next.handle(modifiedRequest).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.errorService.handleError(error);
        throw new Error(error.message);
      })
    );
  }

  async getDataFromApi() {
    this.dataRoleApi = await firstValueFrom(this.configMcService.apiRoleData$);
  }
}
