import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaalumnos',
  templateUrl: './listaalumnos.component.html',
  styleUrl: './listaalumnos.component.css'
})
export class ListaalumnosComponent implements OnInit {
  public alumnos!: Array<Alumno>


  constructor(private _service: AlumnosService, private _activeRoute: ActivatedRoute, private _router: Router) {

  }

  ngOnInit(): void {
    this.getAlumnosActuales();
  }

  getAlumnosActuales(): void {
    this._service.geAlumnosPorYear(2023).subscribe(response => {
      this.alumnos = response;
    })
  }

  // eliminarAlumno(idAlumno: number): void {
  //   this._activeRoute.params.subscribe((parametros: Params) => {
  //     this._service.deleteAlumno(idAlumno).subscribe(response =>{
  //       console.log(response);
  //       this.getAlumnosActuales();
  //     })

  //   })
  // }

  eliminarAlumno(idAlumno: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al alumno. ¿Estás seguro de continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteAlumno(idAlumno).subscribe(response => {
          Swal.fire({
            position: 'center',
            title: 'Eliminado',
            text: 'El alumno con ID ' + idAlumno + ' ha sido eliminado',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.getAlumnosActuales();
          });

        });
      }
      // Si el usuario cancela, no se hace nada.
    });
  }
}
