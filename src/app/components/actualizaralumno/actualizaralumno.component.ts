import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-actualizaralumno',
  templateUrl: './actualizaralumno.component.html',
  styleUrl: './actualizaralumno.component.css'
})
export class ActualizaralumnoComponent implements OnInit {

  public alumno!: Alumno;

  @ViewChild('alumnoForm') alumnoForm!: NgForm;
  @ViewChild('idAlumno') idAlumnoInput!: ElementRef; //hidden ó disabled en html
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('apellidosInput') apellidosInput!: ElementRef;
  @ViewChild('imagenInput') imagenInput!: ElementRef;
  @ViewChild('activoInput') activoInput!: ElementRef;
  @ViewChild('idCursoInput') idCursoInput!: ElementRef;

  constructor(
    private _router: Router,
    private _aciveRoute: ActivatedRoute,
    private _service: AlumnosService) {

  }

  ngOnInit(): void {
    this._aciveRoute.params.subscribe((parametros: Params) => {
      var id = parseInt(parametros['idalumno']);
      console.log('ID del parametro recibido es: ' + id);
      var idCurso = parseInt(parametros['idcurso']);
      console.log('Id del curso', idCurso);

      console.log('1 está activo, y 0 no está activo: ', parametros['activo'])
      this.alumno = new Alumno(
        id,
        parametros['nombre'],
        parametros['apellidos'],
        parametros['imagen'],
        parametros['activo'],
        idCurso
      )

    })
  }

  actualizarAlumnoSinToken(): void {
    // Este método no está implementado ni hecho en el servicio
    var idalumno = parseInt(this.idAlumnoInput.nativeElement.value);
    var nombre = this.nombreInput.nativeElement.value;
    var apellidos = this.apellidosInput.nativeElement.value;
    var imagen = this.imagenInput.nativeElement.value;
    var activo = this.activoInput.nativeElement.checked ? 1 : 0; // convierte a 1 si está activo, 0 si no
    var idCurso = parseInt(this.idCursoInput.nativeElement.value);
    // Validación de campos
    if (!nombre || !apellidos || isNaN(idCurso)) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos del formulario.",
        text: "Hay campos sin rellenar o datos erróneos.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    var newAlumno = new Alumno(idalumno, nombre, apellidos, imagen, activo, idCurso);

    this._service.putAlumno(newAlumno).then(result => {
      console.log(newAlumno);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: nombre + 'actualizado',
        text: nombre + ' fue actualizado con éxito',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Redirigir a la página de inicio
        this._router.navigate(['/home']);
      })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
    })

  }

  actualizarAlumnoConToken() {

    var user = new User(
      'alumno',
      'tajamar'
    );
    var idalumno = parseInt(this.idAlumnoInput.nativeElement.value);
    var nombre = this.nombreInput.nativeElement.value;
    var apellidos = this.apellidosInput.nativeElement.value;
    var imagen = this.imagenInput.nativeElement.value;
    var activo = this.activoInput.nativeElement.checked ? 1 : 0; // convierte a 1 si está activo, 0 si no
    var idCurso = parseInt(this.idCursoInput.nativeElement.value);
    // Validación de campos
    if (!nombre || !apellidos || isNaN(idCurso)) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos del formulario.",
        text: "Hay campos sin rellenar o datos erróneos.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    var newAlumno = new Alumno(idalumno, nombre, apellidos, imagen, activo, idCurso);

    this._service.loginAlumno(user).subscribe(response => {
      let token = response.response;
      console.log("Token-response: ", token);
      console.log(newAlumno);
      this._service.putAlumnoToken(newAlumno, token).subscribe(result => {
        // console.log(result);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: nombre + 'actualizado',
          text: nombre + ' fue actualizado con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Redirigir a la página de inicio
          this._router.navigate(['/home']);
        })
          .catch(error => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
              showConfirmButton: false,
              timer: 1500
            });
          });
      })
    })



  }

}
