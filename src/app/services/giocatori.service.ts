import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Giocatore } from '../models/giocatori.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiocatoriService {

apiUrl = "http://localhost:3000/giocatori";

  constructor(private http: HttpClient) { }



 getAll(): Observable<Giocatore[]>  {
    return this.http.get<Giocatore[]>(this.apiUrl)
  }

   addGiocatore(giocatore: Giocatore): Observable<Giocatore> {
      return this.http.post<Giocatore>(this.apiUrl, giocatore)
    }
  
    deleteGiocatore(id: string): Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }

}
