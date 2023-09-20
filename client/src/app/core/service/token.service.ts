import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ISellerAll } from 'src/app/shared/model/seller.model';

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFTUE9UTzM5IiwidGltZXN0YW1wIjoiMjAyMzA4MzExMDEwIiwibG9jYXRpb25Db2RlIjoiOTc0MzkiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IuC4lOC4suC4o-C4suC4geC4suC4meC4leC5jCIsImxhc3RuYW1lIjoiLiIsInNoYXJlZFVzZXIiOiJBU1BPVE8zOSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoic2ZmLXdlYiIsImFzY0NvZGUiOiIiLCJtb2JpbGVObyI6IiIsInN1YiI6IlBBUlRORVJMREFQIiwicGluQ29kZSI6IiIsImF1dGhlbnRpY2F0aW9uIjoibmV3TG9naW4iLCJsb2NhdGlvbk9ubGluZSI6IiIsImZsYWdVc2VyVHlwZSI6IlNIQVJFIiwicm9sZUFjaW0iOiJBU1AiLCJvdXRQb3NpdGlvbiI6Ik1hbmFnZXIiLCJvdXRDaG5TYWxlcyI6IkFJUyBieSBQYXJ0bmVyIiwib3V0Q2huU2FsZXNDb2RlIjoiQVNQIiwib3UiOiJQQVJUTkVSIiwiaWF0IjoxNjkzNDUxNDAyLCJleHAiOjk5OTk5OTk5OTl9.Vr05CYMEo6zUnhpFjfIKwzKjlUN9mlSa2X4CsLM4PpY';
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNBU0lUSFRIIiwidGltZXN0YW1wIjoiMjAyMzA5MTUwOTAyIiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoic2FzaXRodGhAYWlzLmNvLnRoIiwiZmlyc3RuYW1lIjoic2FzaXRoIiwibGFzdG5hbWUiOiJ0aGFuYXJhayIsInNoYXJlZFVzZXIiOiIiLCJ1c2VyVHlwZSI6IkFJUyIsInJvbGUiOiJBSVMiLCJjaGFubmVsVHlwZSI6InNmZi13ZWIiLCJhc2NDb2RlIjoiIiwibW9iaWxlTm8iOiIwODE5ODA1MDQ1Iiwic3ViIjoiRU1QTE9ZRUVMREFQIiwicGluQ29kZSI6IjAwMDUyOTE4IiwiYXV0aGVudGljYXRpb24iOiJuZXdMb2dpbiIsImxvY2F0aW9uT25saW5lIjoiIiwiZmxhZ1VzZXJUeXBlIjoiSU5ESVZJRFVBTCIsInJvbGVBY2ltIjoiQkFDS09GRklDRUFJUyIsIm91dFBvc2l0aW9uIjoiT2ZmaWNlciIsIm91dENoblNhbGVzIjoiQUlTIFNob3AiLCJvdXRDaG5TYWxlc0NvZGUiOiJBSVNTSE9QIiwib3UiOiJFTVBMT1lFRSIsImlhdCI6MTY5NDc0MzM2MSwiZXhwIjoxNjk0NzQ2OTYxfQ.1qn96GbtZQjHiX1I-kvzyTKglyi4TTOLlI1YUBCLYRk';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  dataAccestoken: ISellerAll;

  constructor(private cookieService: CookieService) {
    if (!this.cookieService?.get('accessToken')) {
      this.cookieService?.set('accessToken', MOCK_TOKEN);
    }
    this.dataAccestoken = this.cookieService?.get('accessToken')
      ? jwt_decode(this.cookieService?.get('accessToken'))
      : jwt_decode(MOCK_TOKEN);
  }

  getDataToken() {
    return this.dataAccestoken;
  }

  calculateTokenToExpire(thresholdMinutes = 10) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = this.dataAccestoken.exp - currentTime;

    return timeUntilExpiration <= thresholdMinutes * 60;
  }
}
