import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeteccionDispositivo } from '../deteccionDispositivo';
import { AnioHorario, Curso, Grupo, Hora } from '../models/modelos';
import { StateService } from '../state.service';

@Component({
  selector: 'app-horario-item',
  templateUrl: './horario-item.component.html',
  styleUrls: ['./horario-item.component.css']
})
export class HorarioItemComponent implements OnInit {

  _cursos!: Curso[];
  @Input() set cursos(cursos: Curso[]){
    this._cursos = cursos;
    this.tableroHorario = this.service.tablero(cursos);
  };
  @Input() titulo!: string;
  tableroHorario!: Grupo[][][];
  hoverElement = "";

  horasAcademicas: Hora[] = [];
  diasAcademicos: string[] = [];

  isDesktop = false;
  constructor(public service: StateService, private deviceService: DeteccionDispositivo) {
  }
  

  ngOnInit(): void {
    this.horasAcademicas = this.service.horasAcademicas;
    this.diasAcademicos = this.service.diasAcademicos;
    this.tableroHorario = this.service.tablero(this._cursos);
    this.isDesktop = this.deviceService.isDesktop();
  }

  save(cursoGrupo: Grupo) {
    if(!this.isDesktop){
      this.hoverElement = '';
    }
    
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

 



}

