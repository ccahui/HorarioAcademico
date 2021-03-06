import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { AnioHorario, Curso } from '../models/modelos';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit, OnDestroy {
   readonly LIMITE = 9;

  horarios!: AnioHorario[];
  subscription!:Subscription;
  
  sePuedeVisualizar= false;
  
  
  constructor(public service: StateService) { }

  ngOnInit() {
    this.subscription = this.service.dataFiltrada$.subscribe(dataFiltrada=>{
      this.horarios = dataFiltrada;
      this.sePuedeVisualizarEnUnUnicaTabla();
    });
  }

  sePuedeVisualizarEnUnUnicaTabla(){
    if(this.seAplicoAlgunFiltroDeCursos() && this.seSeleccionoCursosDeMasDeUnAnio()){
      if(this.lengthCursosSeleccionados() <= this.LIMITE){
        this.sePuedeVisualizar = true;
      } else {
        this.sePuedeVisualizar = false;
      }
    } else {
      this.sePuedeVisualizar = false;
    } 
    
  }
  cursosEnUnaUnicaTabla(){
    console.log("LLmando");
    let cursos:Curso[] = [];
    this.horarios.forEach(horarioAnio=>{
      cursos.push(...horarioAnio.cursos);
    });
   return cursos;
  }
  tituloEnUnaUnicaTabla(){
    let titulo = this.horarios[0].nombre;
    for(let i = 1 ; i < this.horarios.length; i ++){
      titulo+=", "+this.horarios[i].nombre;
    }
    return titulo;
  }

  private seAplicoAlgunFiltroDeCursos(){
    return this.horarios != this.service.horarios;
  }
  private seSeleccionoCursosDeMasDeUnAnio(){
    return this.horarios.length > 1;
  }

  private lengthCursosSeleccionados(){
    let nCursos = 0;
    this.horarios.forEach(horarioAnio=>{
      nCursos+= horarioAnio.cursos.length;
    });
    return nCursos;
  }
  

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
