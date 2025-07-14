import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCalendarioClienteComponent } from './citas-calendario-cliente.component';

describe('CitasCalendarioClienteComponent', () => {
  let component: CitasCalendarioClienteComponent;
  let fixture: ComponentFixture<CitasCalendarioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasCalendarioClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCalendarioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
