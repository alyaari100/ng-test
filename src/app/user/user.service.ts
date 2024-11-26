import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, Status, User } from './user-list/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl= environment.baseUrl;
  constructor( private http:HttpClient) {}

getItemById(id: any):Observable<User> {
  return this.http.get<User>(this.baseUrl+"users/"+id);
 // return this.http.get<KPIs>(this.baseUrl + 'KPIss/' + id);
}
getAll():Observable<any> {

//   
   return this.http.get<User>(this.baseUrl+"users" );
 }
 filterDataByRole(role:string):Observable<any> {

//   
   return this.http.get<User>(this.baseUrl+"users?role="+role );
 }
updateItem(data: User, editId: any):Observable<User>  {
  return this.http.put<any>(this.baseUrl+"users/", data);
}

deleteItem(id:any):Observable<User>  {
  return this.http.delete<any>(this.baseUrl+"users/" + id);}
 
addItem(data:User):Observable<User> {
    return this.http.post<User>(this.baseUrl+"users" ,data);
 }


 
}
