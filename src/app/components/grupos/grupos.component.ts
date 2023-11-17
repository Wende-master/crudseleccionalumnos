import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AlumnosService } from '../../services/alumnos.service';
import { Alumno } from '../../models/alumno';

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

  public generarPDF(): void {
    var DATA: any = document.getElementById('grupos-container');
    html2canvas(DATA).then((canvas) => {
      var fileWidth = 208;
      var fileHeight = (canvas.height * fileWidth) / canvas.width;
      var FILEURI = canvas.toDataURL('image/png');
      var PDF = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('grupos.pdf');
    });
  }


  generarGrupos(): void {
    this.playAudio();
    let contador = 0;
    if (contador < this.alumnos.length) {
      console.log(this.alumnos.length)
      setInterval(() => {
        let grupo = Math.floor(Math.random() * 8);
        let arrayGrupos = Array.from(document.querySelector('#grupos-container')!.children);

        if (contador == this.alumnos.length - 1) {
          let alumnoSpan = document.createElement('p');
          alumnoSpan.innerHTML =
            this.alumnos[contador].nombre +
            ' ' +
            this.alumnos[contador].apellidos;
          arrayGrupos[grupo].append(alumnoSpan);
          contador++;
        } else if (arrayGrupos[grupo].children.length < 3) {
          let alumnoSpan = document.createElement('p');
          alumnoSpan.innerHTML =
            this.alumnos[contador].nombre +
            ' ' +
            this.alumnos[contador].apellidos;
          arrayGrupos[grupo].append(alumnoSpan);
          contador++;

          // Establecer el background-color para cuando un grupo este completo
          if (
            arrayGrupos[grupo].children.length === 3 ||
            arrayGrupos[grupo].children.length === 4
          ) {
            (arrayGrupos[grupo] as HTMLElement).style.backgroundColor = 'lightgreen';
          }
        }
      }, 1000);
    }
  }
}
