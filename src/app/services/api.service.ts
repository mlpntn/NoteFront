import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {host} from './config'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  link = 'https://localhost:44332/api/Notes/';

  public notes = [
    {
      title: 'Title 1',
      description: 'Title 1 Description'
    },
    {
      title: 'Title 2',
      description: 'Title 2 Description'
    },
    {
      title: 'Title 3',
      description: 'Title 3 Description'
    },  
  ] 

  constructor(private http: HttpClient) { }

  public getNotes() : Promise<any> {
    return this.http.get<any>(`${host}GetAll`).toPromise();
  }

  public addNotes(obj) {
    return this.http.post<any>(`${host}AddNote`, obj).toPromise();
  }

  public updateNotes(obj) {
    return this.http.put<any>(`${host}UpdateNote`, obj).toPromise();
  }

  public deleteNotes(id) {
    return this.http.delete<any>(`${host}DeleteNote?id=${id}`).toPromise();
  }


}
