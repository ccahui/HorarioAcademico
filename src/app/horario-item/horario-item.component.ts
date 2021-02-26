import { Component, Input, OnInit } from '@angular/core';
import { AnioHorario, Grupo, Hora } from '../models/modelos';
import { StateService } from '../state.service';

@Component({
  selector: 'app-horario-item',
  templateUrl: './horario-item.component.html',
  styleUrls: ['./horario-item.component.css']
})
export class HorarioItemComponent implements OnInit {

  @Input() horarioItem!: AnioHorario;
  tableroHorario!: Grupo[][][];
  hoverElement = "";

  horasAcademicas: Hora[] = [];
  diasAcademicos: string[] = [];
  constructor(public service: StateService) {
  }

  ngOnInit(): void {
    this.horasAcademicas = this.service.horasAcademicas;
    this.diasAcademicos = this.service.diasAcademicos;
    this.tableroHorario = this.service.tablero(this.horarioItem);
  }

  save(cursoGrupo: Grupo) {

    let refParent = cursoGrupo.refParent;
    let cursoGrupos = cursoGrupo.isLab ? refParent.gruposLaboratorio : refParent.gruposTeoria;

    cursoGrupos.forEach((element) => {
      if (element == cursoGrupo) {
        element.seleccionado = !element.seleccionado;
      } else {
        element.seleccionado = false;
      }
    });
  }

  printGrupos(cursoGrupos: Grupo[]) {
    let cadena = "";
    if (cursoGrupos.length > 0) {
      cadena += "(";
      for (let i = 0; i < cursoGrupos.length; i++) {
        cadena += cursoGrupos[i].nombre;
        if (i < cursoGrupos.length - 1) {
          cadena += ", ";
        }
      }
      cadena += ")"
    }
    return cadena;
  }




}

