import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroComponent } from './filtro/filtro.component';
import { FiltroItemComponent } from './filtro-item/filtro-item.component';
import { HorarioComponent } from './horario/horario.component';
import { HorarioItemComponent } from './horario-item/horario-item.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltroComponent,
    FiltroItemComponent,
    HorarioComponent,
    HorarioItemComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    CommonModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
