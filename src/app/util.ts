
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment';
import * as DATA from './data.json';

import { Injectable } from '@angular/core';
import { AnioHorario, Curso, Grupo, Hora, HoraDia } from './models/modelos';
import { InputAnioHorario, InputCurso } from './models/inputModels';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({ providedIn: 'root' })

export class Util {
  private horas: Hora[];
  private diasAbreviados: string[]
  private dias: string[];
  private format = "HH:mm";
  private tableroColums;
  private tableroRows;

  constructor() {
    this.horas = this.initHorasAcademicas();
    this.diasAbreviados = this.initDiasAcademicosAbreviados();
    this.dias = this.initDiasAcademicos();
    this.tableroColums = this.diasAbreviados.length;
    this.tableroRows = this.horas.length;
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

  tableroHorario(cursos: Curso[]) {
    let arrayBidimensional = this.initArray();
    cursos.forEach(curso => {
      curso.gruposTeoria.forEach(grupoCurso => {
        grupoCurso.horas.forEach(grupoHora => {
          this.mapear(grupoHora, grupoCurso, arrayBidimensional);
        });
      });
      curso.gruposLaboratorio.forEach(grupoCurso => {
        grupoCurso.horas.forEach(grupoHora => {
          this.mapear(grupoHora, grupoCurso, arrayBidimensional);
        });
      })
    });
    return arrayBidimensional;
  }
  miLeyenda(aniosHorario: AnioHorario[]) {

    let leyenda: { abreviatura: string, nombre: string, teoria: string[], laboratorio: string[] }[] = [];
    aniosHorario.forEach(anioCursos =>
      anioCursos.cursos.forEach(curso => {
        curso.gruposTeoria.forEach(grupoCurso => {
          if (grupoCurso.seleccionado) {
            let element = leyenda.find(item => item.nombre == curso.nombre);
            if (element == null) {
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
        curso.gruposLaboratorio.forEach(grupoCurso => {
          if (grupoCurso.seleccionado) {
            let element = leyenda.find(item => item.nombre == curso.nombre);
            if (element == null) {
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
            grupoCurso.horas.forEach(grupoHora => {
              this.mapear(grupoHora, grupoCurso, arrayBidimensional);
            });
          }
        });
        curso.gruposLaboratorio.map(grupoCurso => {
          if (grupoCurso.seleccionado) {
            grupoCurso.horas.forEach(grupoHora => {
              this.mapear(grupoHora, grupoCurso, arrayBidimensional);
            });
          }
        })
      }));
    return arrayBidimensional;
  }

  private initHorasAcademicas() {
    let horas: Hora[] = [];
    this.horasAcademicas7_12y20(horas);
    this.horasAcademicas12y20_14(horas);
    this.horasAcademicas14_19y20pm(horas);
    this.horasAcademicas19y20_20y10pm(horas);
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

  private horasAcademicas7_12y20(horas: Hora[]) {
    let hora = (moment("7:00", this.format));

    for (let i = 0; i < 6; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(this.format);
      hora.add(50, 'minutes');
      let fin = hora.format(this.format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private horasAcademicas12y20_14(horas: Hora[]) {
    let hora = (moment("12:20", this.format));

    for (let i = 0; i < 2; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(this.format);
      hora.add(50, 'minutes');
      let fin = hora.format(this.format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private horasAcademicas14_19y20pm(horas: Hora[]) {
    let hora = (moment("14:00", this.format));

    for (let i = 0; i < 6; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(this.format);
      hora.add(50, 'minutes');
      let fin = hora.format(this.format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private horasAcademicas19y20_20y10pm(horas: Hora[]) {
      horas.push(
        { inicio: "19:20", fin: "20:10" }
      );
  }

  private initArray() {
    let arrayBidimensional: Grupo[][][] = new Array(this.tableroRows);
    for (let i = 0; i < this.tableroRows; i++) {
      arrayBidimensional[i] = new Array(this.tableroColums);
    }
    for (let i = 0; i < this.tableroRows; i++) {
      for (let j = 0; j < this.tableroColums; j++) {
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
    let time = moment(hora, this.format);
    let beforeTime = moment(inicio, this.format);
    let afterTime = moment(fin, this.format);

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
      let gruposLaboratorio: Grupo[] = [];
      if (inputCurso.gruposLaboratorio != null) {
        gruposLaboratorio = this.toGrupoLaboratorio(inputCurso.gruposLaboratorio, curso);

      }

      curso.gruposTeoria = gruposTeoria;
      curso.gruposLaboratorio = gruposLaboratorio;

      return curso;
    });
    return cursos;
  }

  private toGrupoTeoria(inputGrupos: string[], curso: Curso) {
    let gruposTeoria: Grupo[] = inputGrupos.map(grupo => {

      let grupoObject = this.transformGrupo(grupo);
      return {
        id: curso.nombre + "-(T)" + grupoObject.nombre,
        nombre: grupoObject.nombre,
        abreviatura: curso.abreviatura + "-" + grupoObject.nombre,
        horas: grupoObject.horas,
        refParent: curso,
      }
    });
    return gruposTeoria;
  }

  private toGrupoLaboratorio(inputGrupos: string[], curso: Curso) {
    let gruposLaboratorio: Grupo[] = inputGrupos.map(grupo => {
      let grupoObject = this.transformGrupo(grupo);
      return {
        id: curso.nombre + "-(L)" + grupoObject.nombre,
        nombre: grupoObject.nombre,
        abreviatura: curso.abreviatura + "-" + grupoObject.nombre + "(L)",
        horas: grupoObject.horas,
        refParent: curso,
        isLab: true,
      }
    });
    return gruposLaboratorio;
  }
  private transformGrupo(grupos: string) {
    let array = grupos.split(";");
    let horas: HoraDia[] = []
    for (let i = 1; i < array.length; i++) {
      let array2 = array[i].split("-");
      horas.push({
        dia: array2[0],
        inicio: array2[1],
        fin: array2[2],
      })
    }
    let obj: {
      nombre: string,
      horas: HoraDia[]
    } = {
      nombre: array[0],
      horas: horas,
    }
    return obj;
  }



 

}