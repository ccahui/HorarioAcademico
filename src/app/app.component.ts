import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  anioSemestre = environment.horarioAnio;

  urlHorariosEpis = [{
    nombre:"Link 1",
    url: "https://www.facebook.com/Escuela-Profesional-de-Ingenieria-de-Sistemas-171720913528/photos/pcb.10158029491278529/10158029479133529/"
  },
]; 
  ultimaFechaDeActualizacion="03 de enero del 2021";

  
  constructor(){
  }
}
