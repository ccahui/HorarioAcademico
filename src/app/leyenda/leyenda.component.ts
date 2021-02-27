import { Component, Input, OnInit } from '@angular/core';
import { Curso, Grupo } from '../models/modelos';

@Component({
  selector: 'app-leyenda',
  templateUrl: './leyenda.component.html',
  styleUrls: ['./leyenda.component.css']
})
export class LeyendaComponent implements OnInit {

  @Input() cursos!: Curso[];
  constructor() { }

  ngOnInit(): void {
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
