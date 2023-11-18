import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-createalumnos',
  templateUrl: './createalumnos.component.html',
  styleUrl: './createalumnos.component.css'
})
export class CreatealumnosComponent {

  @ViewChild('alumnoForm') alumnoForm!: NgForm;
  @ViewChild('nombreInput') nombreInput!: ElementRef;
  @ViewChild('apellidosInput') apellidosInput!: ElementRef;
  @ViewChild('imagenInput') imagenInput!: ElementRef;
  @ViewChild('activoInput') activoInput!: ElementRef;
  @ViewChild('idCursoInput') idCursoInput!: ElementRef;

  public alumnos: Array<Alumno> = [];
  
  //Para el token 
  public user = new User(
    'alumno',
    'tajamar'
  );

  constructor(private _service: AlumnosService, private router: Router) {



  }

  guardarAlumno() {
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
        text: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    var newAlumno = new Alumno(0, nombre, apellidos, imagen, activo, idCurso);

    this._service.postAlumno(newAlumno)
      .then(response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alumno creado',
          text: nombre + ' fue creado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
        // Redirigir a la página de inicio
        this.router.navigate(['/home']);

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
  }

  crearAlumnoConToken(): void {
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
        text: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    var newAlumno = new Alumno(0, nombre, apellidos, imagen, activo, idCurso);

    this._service.loginAlumno(this.user).subscribe(response => {
      let token = response.response;
      console.log(token.response);
      console.log(newAlumno)
      this._service.postAlumnoConToken(newAlumno, token).subscribe(result => {
        console.log(result);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alumno creado',
          text: nombre + ' fue creado con éxito',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Redirigir a la página de inicio
          this.router.navigate(['/home']);
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
