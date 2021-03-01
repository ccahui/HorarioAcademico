
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment';
import * as DATA from './data.json';

import { Injectable } from '@angular/core';
import { AnioHorario, Curso, Grupo, Hora, HoraDia } from './models/modelos';
import { InputAnioHorario, InputCurso, InputGrupo } from './models/inputModels';
@Injectable({ providedIn: 'root' })

export class Util {
  private horas: Hora[];
  private diasAbreviados: string[]
  private dias: string[];

  constructor() {
    this.horas = this.initHorasAcademicas();
    this.diasAbreviados = this.initDiasAcademicosAbreviados();
    this.dias = this.initDiasAcademicos();
  }
  getDiasAcademicos() {
    return this.dias
  }
  getHorasAcademicas() {
    return this.horas;
  }
  getDiasAbreviados() {
    return this.diasAbreviados;
  }
  fakerHorariosDataFormat() {

    let data = (DATA as any).default;
    let horarios: InputAnioHorario[] = data.map((anioCursos: any) => {

      let cursos: InputCurso[] = anioCursos.cursos.map((curso: string) => {
        return {
          nombre: curso,
          abreviatura: curso.substr(0, 3).toUpperCase(),
          gruposTeoria: [
            { nombre: 'A', horas: [this.randomHoraDia(), this.randomHoraDia()] },
            { nombre: 'B', horas: [this.randomHoraDia(), this.randomHoraDia()] }
          ],
          gruposLaboratorio: [
            { nombre: 'A', horas: [this.randomHoraDia()] },
            { nombre: 'B', horas: [this.randomHoraDia()] },
          ]
        };
      });
      return {
        nombre: anioCursos.nombre,
        cursos: cursos
      }
    });
    return horarios;
  }

  tableroHorario(anioCursos: AnioHorario) {
    let arrayBidimensional = this.initArray();
    anioCursos.cursos.map(curso => {
      curso.gruposTeoria.map(grupoCurso => {
        grupoCurso.horas.map(grupoHora => {
          this.mapear(grupoHora, grupoCurso, arrayBidimensional);
        });
      });
      curso.gruposLaboratorio.map(grupoCurso => {
        grupoCurso.horas.map(grupoHora => {
          this.mapear(grupoHora, grupoCurso, arrayBidimensional);
        });
      })
    });
    return arrayBidimensional;
  }
  miLeyenda(aniosHorario: AnioHorario[]){

    let leyenda : {abreviatura: string, nombre: string, teoria: string[], laboratorio:string[]}[] = [];
    aniosHorario.forEach(anioCursos =>
      anioCursos.cursos.forEach(curso => {
       curso.gruposTeoria.forEach(grupoCurso => {
          if (grupoCurso.seleccionado) {
            let element = leyenda.find(item=> item.nombre == curso.nombre);
            if(element == null){
                element = {
                  abreviatura: curso.abreviatura,
                  nombre: curso.nombre,
                  teoria: [],
                  laboratorio: [], 
                }
                leyenda.push(element)
            }
            element.teoria.push(grupoCurso.nombre);
            
          }
        });
        curso.gruposLaboratorio.map(grupoCurso => {
          if (grupoCurso.seleccionado) {
            let element = leyenda.find(item=> item.nombre == curso.nombre);
            if(element == null){
                element = {
                  abreviatura: curso.abreviatura,
                  nombre: curso.nombre,
                  teoria: [],
                  laboratorio: [], 
                }
                leyenda.push(element)
            }
            element.laboratorio.push(grupoCurso.nombre);
          }
        })
      }));
    return leyenda;
  }
  miHorarioTablero(aniosHorario: AnioHorario[]) {
    let arrayBidimensional = this.initArray();
    aniosHorario.forEach(anioCursos =>
      anioCursos.cursos.forEach(curso => {
        curso.gruposTeoria.forEach(grupoCurso => {
          if (grupoCurso.seleccionado) {
            grupoCurso.horas.map(grupoHora => {
              this.mapear(grupoHora, grupoCurso, arrayBidimensional);
            });
          }
        });
        curso.gruposLaboratorio.map(grupoCurso => {
          if (grupoCurso.seleccionado) {
            grupoCurso.horas.map(grupoHora => {
              this.mapear(grupoHora, grupoCurso, arrayBidimensional);
            });
          }
        })
      }));
    return arrayBidimensional;
  }

  private initHorasAcademicas() {
    let horas: Hora[] = [];
    this.horasAcademicas7am_1y20pm(horas);
    this.horasAcademicas2pm_8y20pm(horas);

    return horas;
  }

  private initDiasAcademicosAbreviados() {
    let dias = ["L", "M", "MI", "J", "V"];
    return dias;
  }

  private initDiasAcademicos() {
    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    return dias;
  }

  private horasAcademicas7am_1y20pm(horas: Hora[]) {
    let format = "HH:mm a";
    let hora = (moment("7:00 am", "HH:mm a"));

    for (let i = 0; i < 7; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(format);
      hora.add(50, 'minutes');
      let fin = hora.format(format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private horasAcademicas2pm_8y20pm(horas: Hora[]) {
    let format = "HH:mm a";
    let hora = (moment("14:00 pm", "HH:mm a"));

    for (let i = 0; i < 7; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(format);
      hora.add(50, 'minutes');
      let fin = hora.format(format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private randomHoraDia() {
    let horaObj = this.horaAcademicaAleatorio();
    let dia = this.diaAcademicAleatorio()

    let inicio = horaObj.inicio;
    if (horaObj.inicio == "12:30 pm") {
      inicio = "7:00 am";
    }

    let format = "HH:mm a";
    let hora = (moment(inicio, format));
    hora.add('100', 'minutes');
    let fin = hora.format(format);

    let randomHoraDia: HoraDia = {
      inicio: inicio, fin: fin, dia: dia
    }
    return randomHoraDia;
  }

  private horaAcademicaAleatorio() {
    return this.horas[Math.floor(Math.random() * (this.horas.length - 2))];
  }
  private diaAcademicAleatorio() {
    return this.diasAbreviados[Math.floor(Math.random() * (this.dias.length))];
  }

  private initArray() {
    let arrayBidimensional: Grupo[][][] = new Array(14);
    for (let i = 0; i < 14; i++) {
      arrayBidimensional[i] = new Array(5);
    }
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 5; j++) {
        arrayBidimensional[i][j] = [];
      }
    }
    return arrayBidimensional;
  }



  private mapear(grupoHora: HoraDia, grupoCurso: Grupo, arrayBidimensional: Grupo[][][]) {
    let j = this.diasAbreviados.findIndex(hora => hora == grupoHora.dia);
    let arrayI = this.mapearHora(grupoHora);
    arrayI.forEach(i => {
      arrayBidimensional[i][j].push(grupoCurso);
    });
  }

  private mapearHora(grupoHora: HoraDia) {

    let inicio = grupoHora.inicio;
    let fin = grupoHora.fin;

    let arrayI = [];

    let firstI = this.horas.findIndex(horaObject => {
      return this.between(inicio, fin, horaObject.inicio);
    });
    arrayI.push(firstI);
    for (let i = firstI + 1; i < this.horas.length; i++) {
      let rpta = this.between(inicio, fin, this.horas[i].inicio);
      if (rpta) {
        arrayI.push(i);
      }
    }
    return arrayI;
  }

  private between(inicio: string, fin: string, hora: string) {
    let format = 'HH:mm a';
    let time = moment(hora, format);
    let beforeTime = moment(inicio, format);
    let afterTime = moment(fin, format);

    let rpta = time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime);
    return rpta;
  }

  public toAnioHorario(data: InputAnioHorario[]): AnioHorario[] {
    let anioHorarios: AnioHorario[] = data.map(inputAnioCurso => {
      let cursos: Curso[] = this.toCurso(inputAnioCurso.cursos);
      return {
        nombre: inputAnioCurso.nombre,
        cursos: cursos,
      }
    });
    return anioHorarios;
  }

  private toCurso(inputsCursos: InputCurso[]) {
    let cursos: Curso[] = inputsCursos.map(inputCurso => {
      let curso: Curso = {
        nombre: inputCurso.nombre,
        abreviatura: inputCurso.abreviatura,
        gruposTeoria: [],
        gruposLaboratorio: [],
      }

      let gruposTeoria: Grupo[] = this.toGrupoTeoria(inputCurso.gruposTeoria, curso);
      let gruposLaboratorio:Grupo[] = [];
      if(inputCurso.gruposLaboratorio != null){
        gruposLaboratorio = this.toGrupoLaboratorio(inputCurso.gruposLaboratorio, curso);
        
      }
      
      curso.gruposTeoria = gruposTeoria;
      curso.gruposLaboratorio = gruposLaboratorio;

      return curso;
    });
    return cursos;
  }

  private toGrupoTeoria(inputGrupos: InputGrupo[], curso: Curso) {
    let gruposTeoria: Grupo[] = inputGrupos.map(grupo => {
      return {
        id: curso.nombre + "-(T)" + grupo.nombre,
        nombre: grupo.nombre,
        abreviatura: curso.abreviatura + "-" + grupo.nombre,
        horas: [...grupo.horas],
        refParent: curso,
      }
    });
    return gruposTeoria;
  }

  private toGrupoLaboratorio(inputGrupos: InputGrupo[], curso: Curso) {
    let gruposLaboratorio: Grupo[] = inputGrupos.map(grupo => {
      return {
        id: curso.nombre + "-(L)" + grupo.nombre,
        nombre: grupo.nombre,
        abreviatura: curso.abreviatura + "-" + grupo.nombre + "(L)",
        horas: [...grupo.horas],
        refParent: curso,
        isLab: true,
      }
    });
    return gruposLaboratorio;
  }

}