import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH = "http://localhost:9090"
  requestHeaders = new HttpHeaders(
    {"No-Auth":"True"}
  )
  constructor(private httpclient:HttpClient,private userauthservice:UserAuthService) { }


  public login(loginData: any){
    return this.httpclient.post(this.PATH + "/authenticate",loginData,{headers:this.requestHeaders})
  }

  public forUser(){
    return this.httpclient.get(this.PATH+"/forUser",{
      responseType:'text'
    })
  }
  public forAdmin(){
    return this.httpclient.get(this.PATH+"/forAdmin",{
      responseType:'text'
    })
  }

  public roleMatch(allowedRoles:string[]):boolean{
    let isMatch = false;
    const userRoles =this.userauthservice.getRoles();
    if(userRoles != null && userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          if(userRoles[i].rolename == allowedRoles[j]){
            isMatch=true;
            return isMatch;
          }else{
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}