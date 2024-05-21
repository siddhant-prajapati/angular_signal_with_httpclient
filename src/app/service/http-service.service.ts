import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http : HttpClient) { }

  getAllData(){
    return this.http.get('http://localhost:3000/project/all').pipe(
      map((res : any) => {
        return res;
      }),
      catchError((error) => {
        if(error.status === 404){
          alert('not found')
        }
        if(error.status === 500){
          alert('Internal server error')
        }
        return throwError(error)
      })
    )
  }

  addNewProject(project : any) {
    return this.http.post('http://localhost:3000/project/new', project).pipe(
      map((res : any) => {
        return res;
      }),
      catchError((error) => {
        if(error.status === 404){
          alert('not found')
        }
        if(error.status === 401){
          alert('Unauthorize')
        }
        if(error.status === 500){
          alert('Internal server error')
        }
        return throwError(error)
      })
    )
  }
}
