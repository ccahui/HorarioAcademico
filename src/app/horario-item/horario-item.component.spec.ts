import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioItemComponent } from './horario-item.component';

describe('HorarioItemComponent', () => {
  let component: HorarioItemComponent;
  let fixture: ComponentFixture<HorarioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
