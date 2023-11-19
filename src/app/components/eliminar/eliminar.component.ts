import { Component } from '@angular/core';
import { AlumnosService } from '../../services/alumnos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {

  constructor(private _service: AlumnosService, private _activeRoute: ActivatedRoute, private _router: Router) {

  }

  //No necesito este componente para eliminar

  // eliminarAlumno(): void {
  //   this._activeRoute.params.subscribe((parametros: Params) => {
  //     var id = parseInt(parametros['idalumno']);
  //     console.log('ID del parámetro recibido es: ' + id);
  
  //     Swal.fire({
  //       title: '¿Estás seguro?',
  //       text: 'Esta acción eliminará al alumno. ¿Estás seguro de continuar?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Sí, eliminar',
  //       cancelButtonText: 'Cancelar'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Usuario confirmó la eliminación
  //         this._service.deleteAlumno(id).subscribe(response => {
  //           Swal.fire({
  //             title: 'Eliminado',
  //             text: `El alumno con ID ${id} ha sido eliminado`,
  //             icon: 'success',
  //             confirmButtonText: 'Aceptar',
  //             timer: 2500
  //           }).then(() => {
  //             // Redirigir a la ruta "/home" después de la eliminación
  //             this._router.navigate(['/home']);
  //           });
  //         });
  //       }
  //       // Si el usuario cancela, no se hace nada.
  //     });
  //   });
  // }
  
}
