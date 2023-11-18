import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {
  public alumnos!: Array<Alumno>;

  constructor(private _service: AlumnosService) {

  }

  ngOnInit(): void {
    this.getAlumnosActuales();
  }

  getAlumnosActuales(): void {
    this._service.geAlumnosPorYear(2023).subscribe((response) => {
      this.alumnos = response;
    });
  }

  playAudio(): void {
    let audio = new Audio('./../../../assets/audio/himno.mp3');
    audio.play();
  }

  // Esto sirve para añadir los alumnos nuevos a cada grupo (ya que tenemos unt total de 25 alumnos)
  generarGrupos(): void {
    this.playAudio();
    let contador = 0;
    const totalAlumnos = this.alumnos.length;
    if (contador < totalAlumnos) {
      setInterval(() => {
        let grupo = Math.floor(Math.random() * 8);
        let arrayGrupos = Array.from(document.querySelector('#grupos-container')!.children);

        if (contador === totalAlumnos - 1) {
          let alumnoSpan = document.createElement('p');
          alumnoSpan.innerHTML =
            this.alumnos[contador].nombre +
            ' ' +
            this.alumnos[contador].apellidos;
          arrayGrupos[grupo].append(alumnoSpan);
          contador++;
        } else {
          const alumnosPorGrupo = Math.floor(totalAlumnos / arrayGrupos.length);
          const gruposConAlumnoExtra = totalAlumnos % arrayGrupos.length;

          if (arrayGrupos[grupo].children.length < alumnosPorGrupo + (grupo < gruposConAlumnoExtra ? 1 : 0)) {
            let alumnoSpan = document.createElement('p');
            alumnoSpan.innerHTML =
              this.alumnos[contador].nombre +
              ' ' +
              this.alumnos[contador].apellidos;
            arrayGrupos[grupo].append(alumnoSpan);
            contador++;

            // Establecer el background-color para cuando un grupo este completo
            const alumnosEnGrupo = arrayGrupos[grupo].children.length;
            if (alumnosEnGrupo >= alumnosPorGrupo + (grupo < gruposConAlumnoExtra ? 1 : 0)) {
              (arrayGrupos[grupo] as HTMLElement).style.backgroundColor = 'lightgreen';
            }
          }
        }
      }, 1000);
    }
  }

    // Este método hace lo mismo solo que no añade los alumnos nuevos 
  // generarGrupos(): void {
  //   this.playAudio();
  //   let contador = 0;
  //   if (contador < this.alumnos.length) {
  //     console.log(this.alumnos.length)
  //     setInterval(() => {
  //       let grupo = Math.floor(Math.random() * 8);
  //       let arrayGrupos = Array.from(document.querySelector('#grupos-container')!.children);

  //       if (contador == this.alumnos.length - 1) {
  //         let alumnoSpan = document.createElement('p');
  //         alumnoSpan.innerHTML =
  //           this.alumnos[contador].nombre +
  //           ' ' +
  //           this.alumnos[contador].apellidos;
  //         arrayGrupos[grupo].append(alumnoSpan);
  //         contador++;
  //       } else if (arrayGrupos[grupo].children.length < 3) {
  //         let alumnoSpan = document.createElement('p');
  //         alumnoSpan.innerHTML =
  //           this.alumnos[contador].nombre +
  //           ' ' +
  //           this.alumnos[contador].apellidos;
  //         arrayGrupos[grupo].append(alumnoSpan);
  //         contador++;

  //         // Establecer el background-color para cuando un grupo este completo
  //         if (
  //           arrayGrupos[grupo].children.length === 3 ||
  //           arrayGrupos[grupo].children.length === 4
  //         ) {
  //           (arrayGrupos[grupo] as HTMLElement).style.backgroundColor = 'lightgreen';
  //           // Hace que al descargar el archivo en pdf, mantenga el background-color {ó el color}
  //         }

  //       }
  //     }, 1000);
  //   }
  // }


  // hayAlumnosEnGrupos(): boolean {
  //   let arrayGrupos = Array.from(document.querySelector('#grupos-container')!.children);
  //   if (
  //     // Hasta que se completen los grupos no se realiza la descarga del pdf
  //     arrayGrupos[0].children.length == 4) {
  //     return arrayGrupos.some((grupo: Element) => grupo.children.length > 0);

  //   } else {
  //     return false;
  //   }

  // }

  hayAlumnosEnGrupos(): boolean {
    let arrayGrupos = Array.from(document.querySelector('#grupos-container')!.children);

    // Verifica si al menos un grupo tiene exactamente 4 alumnos
    return arrayGrupos.some((grupo: Element) => grupo.children.length === 4 && grupo.children.length > 0);
  }

  generarPDF(): void {
    var DATA: any = document.getElementById('grupos-container');
    if (this.hayAlumnosEnGrupos() == true) {
      html2canvas(DATA).then((canvas) => {
        var fileWidth = 208;
        var fileHeight = (canvas.height * fileWidth) / canvas.width;
        var FILEURI = canvas.toDataURL('image/png');
        var PDF = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        Swal.fire({
          title: "Descarga del Archivo",
          text: "Por favor espere mientras se crea su archivo.",
          imageUrl: FILEURI,
          showConfirmButton: false,

        }).then(
          function () {
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('grupos.pdf');
          }
        )
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No hay grupos completos!',
        text: 'Espere llenar los grupos antes de generar el reporte',
        showConfirmButton: false,
        timer: 2500,
      })
    }
  }


}
