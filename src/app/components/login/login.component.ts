import { Component, ElementRef, ViewChild } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public alumnos!: Array<Alumno>;
  @ViewChild('userName') userName!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  constructor(private _service: AlumnosService, private _router: Router) {

  }

  //Redirigir a home de los alumnos de 2023
  login(): void {
    var user = new User(
      this.userName.nativeElement.value,
      this.password.nativeElement.value
    );

    // Validación de campos
    if (!user.userName || !user.password) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos del formulario.",
        text: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this._service.loginAlumno(user).subscribe(response => {
      console.log(response);
      if (response != null) {
        this._service.authAlumno(response.response, 2023).then(result => {
          console.log("token: " + response.response);
          this._service.geAlumnosPorYear(2023).subscribe(response => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenido '+ user.userName,
              showConfirmButton: false,
              timer: 2000
            });
            this._router.navigate(['/home']);
          })
        })
      } else {
        console.log("ERROR");
      }
    })
  }

}
