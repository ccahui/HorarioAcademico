import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroItemComponent } from './filtro-item.component';

describe('FiltroItemComponent', () => {
  let component: FiltroItemComponent;
  let fixture: ComponentFixture<FiltroItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
