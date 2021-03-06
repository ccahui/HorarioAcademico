import { Component } from '@angular/core';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  anioSemestre = environment.anioAcademico;
  ultimaFechaDeActualizacion = environment.ultimaActualizacion;

  urlHorariosEpis = [{
    nombre: "Link 1",
    url: "https://www.facebook.com/Escuela-Profesional-de-Ingenieria-de-Sistemas-171720913528/photos/pcb.10158029491278529/10158029479133529/"
  },
  ];



  constructor() {
  }
}
