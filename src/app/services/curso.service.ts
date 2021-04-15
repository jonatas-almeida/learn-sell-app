import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos } from '../interfaces/Cursos';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getCursos(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/cursos`);
  }

  getCurso(id: any){
    return this.http.get(`${this.baseUrl}/cursos/${id}`)
  }

  postCurso(curso: Cursos){
    return this.http.post(`${this.baseUrl}/cursos`, curso);
  }

  putCurso(id: any, curso: Cursos){
    return this.http.put(`${this.baseUrl}/cursos/${id}`, curso);
  }

  deleteCurso(id: any){
    return this.http.delete(`${this.baseUrl}/cursos/${id}`);
  }
}
