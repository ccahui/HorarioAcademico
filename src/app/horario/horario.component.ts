import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import * as moment from 'moment';
import { Util } from '../util';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  
  horarios$: any
  constructor(public service: StateService) { }

  ngOnInit() {
    this.horarios$ = this.service.dataFiltrada$;
  }
  click(){
    this.service.saveLocalStorage();
    
  }

  @HostListener("window:beforeunload")
  doSomething() {
    this.service.saveLocalStorage();
  }
  @HostListener("window:unload", ["$event"])
  unloadHandler(event:any) {
    
  }
  


  

}
