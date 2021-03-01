import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import * as moment from 'moment';
import { Util } from '../util';
import { AnioHorario, Curso } from '../models/modelos';
import { BehaviorSubject } from 'rxjs';
import { DeteccionDispositivo } from '../deteccionDispositivo';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  
  horarios$!: BehaviorSubject<AnioHorario[]>;
  constructor(public service: StateService) { }

  ngOnInit() {
    this.horarios$ = this.service.dataFiltrada$;
  }
  descargar(){
    this.service.abrirPdfEnNuevaVentana();

  }

  @HostListener("window:beforeunload")
  doSomething() {
    this.service.saveLocalStorage();
  }
  @HostListener("window:unload", ["$event"])
  unloadHandler(event:any) {
    
  }
  


  

}
