import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-filtro-item',
  templateUrl: './filtro-item.component.html',
  styleUrls: ['./filtro-item.component.css']
})
export class FiltroItemComponent implements OnInit {

  @Input() object: any;
  names: any;
  selectedAll: any;

  constructor(private service: StateService) {
  }
  ngOnInit() {

    this.names = this.object.cursos;
  }

  selectAll() {
    this.selectedAll = !this.selectedAll;
    for (let i = 0; i < this.names.length; i++) {
      this.names[i].selected = this.selectedAll;
    }
    this.service.filtrar();
  }
  checkIfAllSelected() {
    let totalSelected = 0;
    for (let i = 0; i < this.names.length; i++) {
      if (this.names[i].selected) totalSelected++;
    }
    this.selectedAll = totalSelected === this.names.length;
    this.service.filtrar();
  }
}
