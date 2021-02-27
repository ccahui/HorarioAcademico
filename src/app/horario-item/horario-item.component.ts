import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
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

  isMobileOrTablet = false;
  constructor(public service: StateService, private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.horasAcademicas = this.service.horasAcademicas;
    this.diasAcademicos = this.service.diasAcademicos;
    this.tableroHorario = this.service.tablero(this.horarioItem);
    this.isMobileOrTablet = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  save(cursoGrupo: Grupo) {
    if(this.isMobileOrTablet){
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

