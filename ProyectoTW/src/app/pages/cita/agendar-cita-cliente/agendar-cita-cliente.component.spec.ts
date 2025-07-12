import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarCitaClienteComponent } from './agendar-cita-cliente.component';

describe('AgendarCitaClienteComponent', () => {
  let component: AgendarCitaClienteComponent;
  let fixture: ComponentFixture<AgendarCitaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendarCitaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendarCitaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
