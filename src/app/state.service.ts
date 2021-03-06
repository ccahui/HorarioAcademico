import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Util } from './util';
import { AnioHorario, Curso, Grupo, Hora } from './models/modelos';
import { PDF } from './pdf';
import { FakerHorario } from './faker';
import * as dataHorarios from './horarios-2020-A.json';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  horarios: AnioHorario[] = [];
  dataFiltrada$: BehaviorSubject<AnioHorario[]>;

  horasAcademicas: Hora[] = []
  diasAcademicos: string[] = [];

  constructor(private util: Util, private faker: FakerHorario) {
    this.horasAcademicas = this.util.getHorasAcademicas();
    this.diasAcademicos = this.util.getDiasAcademicos();

    this.loadHorarios();

    this.dataFiltrada$ = new BehaviorSubject(this.horarios);
  }
  saveLocalStorage() {



    let idsCursoGrupo: string[] = []
    this.horarios.forEach((anioCursos) => {
      anioCursos.cursos.forEach((curso) => {
        curso.gruposTeoria.forEach((cursoGrupo) => {
          if (cursoGrupo.seleccionado) {
            idsCursoGrupo.push(cursoGrupo.id);
          }
        });
        curso.gruposLaboratorio.forEach((cursoGrupo) => {
          if (cursoGrupo.seleccionado) {
            idsCursoGrupo.push(cursoGrupo.id);
          }
        });
      });
    })
    localStorage.setItem('miHorario', JSON.stringify(idsCursoGrupo));
  
  }

  loadHorarios() {
    let data = (dataHorarios as any).default;
    this.horarios = this.util.toAnioHorario(data);
    this.sincronizarMiHorarioConHorarioAlmacenado();
   
  }
  private sincronizarMiHorarioConHorarioAlmacenado(){
    let miHorario:any = localStorage.getItem("miHorario");
    miHorario = JSON.parse(miHorario);

    if(miHorario != null){
      this.sincronizandoHorario(miHorario);
    }
  }

  private sincronizandoHorario(miHorario:any){
    this.horarios.forEach((anioCursos) => {
      let cursos = anioCursos.cursos;
      cursos.forEach((curso) => {
        curso.gruposTeoria.forEach(cursoGrupo => {
          if (miHorario.some((item: string) => item == cursoGrupo.id)) {
            cursoGrupo.seleccionado = true;
          }
        }
        );
        curso.gruposLaboratorio.forEach(cursoGrupo => {
          if (miHorario.some((item: string) => item == cursoGrupo.id)) {
            cursoGrupo.seleccionado = true;
          }
        }
        );
      });
    });
  }

  filtrar() {
    let dataFiltrada: AnioHorario[] = [];
    this.horarios.forEach(anioCursos => {
      let cursos = anioCursos.cursos.filter((curso) => curso.filtrado == true);
      if (cursos.length > 0) {
        dataFiltrada.push({
          ...anioCursos,
          cursos: cursos
        });
      }
    });
    if (dataFiltrada.length == 0) {
      dataFiltrada = this.horarios;
    }
    this.dataFiltrada$.next(dataFiltrada);
  }

  tablero(cursos: Curso[]) {
    return this.util.tableroHorario(cursos);
  }

  descargarPdf(){
    //let pdf = this.pdfService.generarPdf(this.horarios);
    //pdf.download();
    let pdfService = new PDF(this.util);
    pdfService.generarPdf(this.horarios);
  }
  abrirPdfEnNuevaVentana(){
    //let pdf = this.pdfService.generarPdf(this.horarios);
    //pdf.open();
    let pdfService = new PDF(this.util);
    pdfService.generarPdf(this.horarios);
  }
}

