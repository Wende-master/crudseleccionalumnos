import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private _http:HttpClient) { }

  geAlumnosPorYear(year:number | string):Observable<any>{
    let url=environment.urlApi+ "/api/Alumnos/FiltrarCurso/"+ year
    return this._http.get(url)
  }
}
