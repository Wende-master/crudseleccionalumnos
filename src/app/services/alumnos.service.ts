import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Alumno } from '../models/alumno';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private _http: HttpClient) { }

  geAlumnosPorYear(year: number | string): Observable<any> {
    let url = environment.urlApi + "/api/Alumnos/FiltrarCurso/" + year
    return this._http.get(url)
  }

  postAlumno(alumno: Alumno): Promise<any> {
    var request = "api/alumnos/insertalumno";
    var url = environment.urlApi + request;

    let promise = new Promise((resolve) => {
      var json = JSON.stringify(alumno);
      var httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this._http.post(url, json, httpOptions).subscribe(response => {
       
        resolve(response);
      });

    })
    return promise;
  }

}
