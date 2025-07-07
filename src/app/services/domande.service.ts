import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domanda } from '../models/domande.model';

@Injectable({
  providedIn: 'root'
})
export class DomandeService {

  apiUrl = "http://localhost:3000/domande";
  http = inject(HttpClient)
  
  constructor() { }

  //Chiamata GET
  getAll(): Observable<Domanda[]>  {
    return this.http.get<Domanda[]>(this.apiUrl)
  }

  //chiamata POST
  addQuestion(domanda: Domanda): Observable<Domanda> {
    return this.http.post<Domanda>(this.apiUrl, domanda)
  }


  deleteQuestion(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
  
}
