import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Alumno } from '../models/alumno';
import { User } from '../models/user.models';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private tokenExpirationBuffer = 300; // Buffer de tiempo en segundos antes de que expire el token

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

  postAlumnoConToken(alumno: Alumno, token: string): Observable<any> {
    // unauthorized(401); no ENTIENDO

    var request = "api/Alumnos/InsertAlumnoToken";
    var url = environment.urlApi + request;
    var body = alumno;
    var json = JSON.stringify(body);

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    //console.log(token);
    return this._http.post(url, json, httpOptions);
  }

  loginAlumno(user: User): Observable<any> {
    var json = JSON.stringify(user);
    var request = "api/auth/login";
    var url = environment.urlApi + request;
    console.log(url);

    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(url, json, { headers });
  }

  authAlumno(token: string, year: number | string): Promise<any> {
    var request = "api/Alumnos/FiltrarCurso/" + year;
    var url = environment.urlApi + request;
    console.log(url);

    let promise = new Promise((resolve) => {
      var httpOptions = {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
        'Authorization': 'Bearer ' + token
      };
      console.log(token)
      this._http.get(url, httpOptions).subscribe(response => {
        console.log(response)
        resolve(response);
      })
    })
    return promise;
  }

  deleteAlumno(idAlumno: number): Observable<any> {
    var request = "api/alumnos/deletealumno/" + idAlumno;
    var url = environment.urlApi + request;
    return this._http.delete(url);
  }

  putAlumno(alumno: Alumno): Promise<any> {
    var request = "api/alumnos/updatealumno";
    var url = environment.urlApi + request;

    let promise = new Promise((resolve) => {
      var json = JSON.stringify(alumno);
      var httpOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      this._http.put(url, json, httpOptions).subscribe(response => {
        //console.log(response);

        resolve(response);
      });

    })
    return promise;
  }

  putAlumnoToken(alumno: Alumno, token: string): Observable<any> {
    var request = "api/Alumnos/updateAlumnoToken";
    var url = environment.urlApi + request;
    var body = alumno;
    var json = JSON.stringify(body);

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    console.log(token);
    return this._http.put(url, json, httpOptions);
  }
}
